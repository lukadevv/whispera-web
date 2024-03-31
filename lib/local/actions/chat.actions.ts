"use server";

// TODO: Optimize these actions

import { supabaseServer } from "@/lib/supabase/server";
import { ChatContextType } from "../contexts/ChatContext";
import {
  Contacts,
  Private_Chats,
} from "@/lib/apollo/__generated__/graphql/graphql";

type Actions = ChatContextType["actions"];
type InitialType = {
  privateChats: ChatContextType["privateChats"];
  contacts: ChatContextType["contacts"];
  contactRequest: ChatContextType["contactRequests"];
};

export const sendMessage: Actions["sendMessage"] = async (
  userToId,
  message
) => {
  return !(
    await supabaseServer(false).rpc("sendMessage", {
      user_to_id: userToId,
      message_text: message,
    })
  ).error;
};

export const sendRequest: Actions["sendRequest"] = async (code) => {
  return !(
    await supabaseServer(false).rpc("sendRequest", {
      contact_code: code,
    })
  ).error;
};

export const acceptRequest: Actions["acceptRequest"] = async (requestId) => {
  return !(
    await supabaseServer(false).rpc("acceptRequest", {
      contact_request_id: requestId,
    })
  ).error;
};

export const cancelRequest: Actions["cancelRequest"] = async (id) => {
  const proxyClient = supabaseServer(false);

  const { data } = await proxyClient.from("contact_requests").delete().match({
    id,
  });

  return !!data;
};

export const deleteContact: Actions["deleteContact"] = async (id) => {
  const proxyClient = supabaseServer(false);

  const { data } = await proxyClient.from("contact_requests").delete().match({
    id,
  });

  return !!data;
};

export const denyRequest: Actions["denyRequest"] = async (id) => {
  const proxyClient = supabaseServer(false);

  const { data } = await proxyClient.from("contact_requests").delete().match({
    id,
  });

  return !!data;
};

export const getInitialChat: () => Promise<InitialType> = async () => {
  const bypassClient = supabaseServer(true);
  const proxyClient = supabaseServer(false);
  const {
    data: { user },
  } = await proxyClient.auth.getUser();

  async function getContactRequests(): Promise<InitialType["contactRequest"]> {
    if (!user?.id) {
      return [];
    }

    // Get contact requests as user
    const { data: contactRequestsData, error: contactRequestsError } =
      await proxyClient
        .from("contact_requests")
        .select(`id,created_at,user_from,user_to,accepted`)
        .eq("accepted", false);

    if (contactRequestsError) {
      throw contactRequestsError;
    }

    // Find user_from and get contact as service role
    const { data: contactRequestUsersData, error: contactRequestsUsersError } =
      await bypassClient
        .from("users")
        .select("id,contact")
        .in(
          "id",
          contactRequestsData.map((request) =>
            request.user_from === user.id ? request.user_to : request.user_from
          )
        );

    if (contactRequestsUsersError) {
      throw contactRequestsUsersError;
    }

    // Find contact for user data
    const {
      data: contactRequestContactsData,
      error: contactRequestsContactsError,
    } = await bypassClient
      .from("contacts")
      .select("*")
      .in(
        "id",
        contactRequestUsersData.map((user) => user.contact)
      );

    // Find contact for user data
    if (contactRequestsContactsError) {
      throw contactRequestsContactsError;
    }

    function buildFrom(
      user_from: string
    ): InitialType["contactRequest"][number]["targetUser"] | null {
      const contactId = contactRequestUsersData?.find(
        (user) => user.id === user_from
      )?.contact;

      const contact = contactRequestContactsData?.find(
        (contact) => contact.id === contactId
      );

      if (!contactId || !contact) {
        return null;
      }

      return {
        ...contact,
        id: user_from,
      };
    }

    return contactRequestsData.reduce((array, contactRequest) => {
      const from = buildFrom(
        user.id === contactRequest.user_from
          ? contactRequest.user_to
          : contactRequest.user_from
      );

      console.log(from);

      if (from) {
        array.push({
          id: contactRequest.id,
          created_at: contactRequest.created_at,
          targetUser: from,
          from: {
            id: contactRequest.user_from,
          },
        });
      }

      return array;
    }, [] as InitialType["contactRequest"]);
  }

  async function getContacts(): Promise<InitialType["contacts"]> {
    if (!user?.id) {
      return [];
    }

    // Get contact requests as user
    const { data: contactRequestsData, error: contactRequestsError } =
      await proxyClient
        .from("contact_requests")
        .select(`id,created_at,user_from,user_to`)
        .eq("accepted", true);

    if (contactRequestsError) {
      throw contactRequestsError;
    }

    // Find user_from and get contact as service role
    const { data: contactRequestUsersData, error: contactRequestsUsersError } =
      await bypassClient
        .from("users")
        .select("id,contact")
        .in(
          "id",
          contactRequestsData.map((request) =>
            request.user_from === user.id ? request.user_to : request.user_from
          )
        );

    if (contactRequestsUsersError) {
      throw contactRequestsUsersError;
    }

    // Find contact for user data
    const {
      data: contactRequestContactsData,
      error: contactRequestsContactsError,
    } = await bypassClient
      .from("contacts")
      .select("*")
      .in(
        "id",
        contactRequestUsersData.map((user) => user.contact)
      );

    // Find contact for user data
    if (contactRequestsContactsError) {
      throw contactRequestsContactsError;
    }

    function buildFrom(
      user_from: string
    ): InitialType["contacts"][number] | null {
      const contactRaw = contactRequestUsersData?.find(
        (user) => user.id === user_from
      );

      const contact = contactRequestContactsData?.find(
        (contact) => contact.id === contactRaw?.contact
      );

      const contactRequestId = contactRequestsData?.find(
        (contactRequest) =>
          contactRequest.user_from === user_from ||
          contactRequest.user_to === user_from
      )?.id;

      if (!contactRaw || !contact || !contactRequestId) {
        return null;
      }

      return {
        ...contact,
        userId: user_from,
        requestId: contactRequestId,
      };
    }

    return contactRequestsData.reduce((array, contactRequest) => {
      const from = buildFrom(
        user.id === contactRequest.user_from
          ? contactRequest.user_to
          : contactRequest.user_from
      );

      from && array.push(from);

      return array;
    }, [] as InitialType["contacts"]);
  }

  async function getPrivateChats(): Promise<InitialType["privateChats"]> {
    // Get private chats
    const { data, error } = await proxyClient.from("private_chats").select(`*`);

    if (!data || error) {
      throw error;
    }

    const {
      data: { user },
    } = await proxyClient.auth.getUser();

    if (!user) {
      throw "Session not found";
    }

    // Find user_from and get contact as service role
    const { data: privateChatUsersData, error: privateChatsUsersError } =
      await bypassClient
        .from("users")
        .select("id,contact")
        .in(
          "id",
          data.map((request) =>
            request.user_from === user.id ? request.user_to : request.user_from
          )
        );

    if (privateChatsUsersError) {
      throw privateChatsUsersError;
    }

    // Find contact for user data
    const { data: privateChatContactsData, error: privateChatsContactsError } =
      await bypassClient
        .from("contacts")
        .select("*")
        .in(
          "id",
          privateChatUsersData.map((user) => user.contact)
        );

    // Find contact for user data
    if (privateChatsContactsError) {
      throw privateChatsContactsError;
    }

    // Find message
    const { data: messagesData, error: messagesContactsError } =
      await proxyClient.from("private_messages").select("*");

    // Find contact for user data
    if (messagesContactsError) {
      throw messagesContactsError;
    }

    function buildFrom(
      user_from: string
    ): InitialType["privateChats"][number]["targetUser"] | null {
      const user = privateChatUsersData?.find((user) => user.id === user_from);

      const contact = privateChatContactsData?.find(
        (contact) => contact.id === user?.contact
      );

      if (!user || !contact) {
        return null;
      }

      return {
        ...contact,
        id: user_from,
      };
    }

    return data.reduce((array, privateChat) => {
      const targetUser = buildFrom(
        privateChat.user_from === user.id
          ? privateChat.user_to
          : privateChat.user_from
      );

      targetUser &&
        array.push({
          targetUser,
          privateChat: {
            id: privateChat.id,
            isTyping:
              privateChat.user_from === user.id
                ? privateChat.is_to_typing
                : privateChat.is_from_typing,
            messages: messagesData.reduce((array, each) => {
              if (each.chat === privateChat.id) {
                array.push(each);
              }

              return array;
            }, [] as InitialType["privateChats"][number]["privateChat"]["messages"]),
          },
        });

      return array;
    }, [] as InitialType["privateChats"]);
  }

  return {
    contactRequest: await getContactRequests(),
    contacts: await getContacts(),
    privateChats: await getPrivateChats(),
  } as InitialType;
};

export async function getUserContact(
  userId: string
): Promise<Pick<
  Contacts,
  "id" | "avatar" | "code" | "display_name" | "online"
> | null> {
  const { data } = await supabaseServer(true).rpc("findUserContact", {
    user_find_id: userId,
  });

  if (!data) {
    return null;
  }

  return data as Contacts;
}

export async function readChat(chatId: Private_Chats["id"]): Promise<boolean> {
  return !!(
    await supabaseServer(false).rpc("readMessages", {
      chat_id: chatId,
    })
  ).error;
}

export async function getPrivateChatMessages(chatId: Private_Chats["id"]) {
  return (
    await supabaseServer(false)
      .from("private_messages")
      .select("*")
      .eq("chat", chatId)
  ).data;
}
