import { Database } from "@/lib/supabase/__generated__/types";
import { supabaseClient } from "@/lib/supabase/client";
import { ChatContextType } from "../contexts/ChatContext";
import {
  Contact_Requests,
  Private_Chats,
  Private_Messages,
} from "@/lib/apollo/__generated__/graphql/graphql";
import { getPrivateChatMessages, getUserContact } from "./chat.actions";

function createFilter(
  event: "INSERT" | "UPDATE" | "DELETE" | "*",
  table: keyof Database[Extract<keyof Database, "public">]["Tables"]
) {
  return {
    event: event as any,
    schema: "public",
    table,
  };
}

// TODO: Fix messages when remove and add contacts
const chatSubscriptions = {
  privateChat: {
    subscribeNewPrivateChats: (
      client: ReturnType<typeof supabaseClient>,
      contacts: ChatContextType["contacts"],
      setPrivateChats: ChatContextType["setPrivateChats"]
    ) =>
      client
        .channel("private_chats_new")
        .on(
          "postgres_changes",
          createFilter("INSERT", "private_chats"),
          (data) => {
            if (!data.new) {
              return;
            }
            const newData = data.new as Private_Chats;

            const findContact = contacts.find(
              (each) =>
                each.userId === newData.user_to ||
                each.userId === newData.user_from
            );

            if (!findContact) {
              // Error
              return;
            }

            getPrivateChatMessages(newData.id).then((data) => {
              if (!data) {
                return;
              }

              setPrivateChats((prev) => {
                const newPrivateChats = [...prev];

                newPrivateChats.push({
                  privateChat: {
                    id: newData.id,
                    isTyping: false,
                    messages: data,
                  },
                  targetUser: findContact,
                });

                return newPrivateChats;
              });
            });
          }
        )
        .subscribe(),
    subscribeNewMessages: (
      client: ReturnType<typeof supabaseClient>,
      privateChats: ChatContextType["privateChats"],
      setPrivateChats: ChatContextType["setPrivateChats"]
    ) =>
      client
        .channel("private_messages_new")
        .on(
          "postgres_changes",
          createFilter("INSERT", "private_messages"),
          (data) => {
            if (!data.new) {
              return;
            }

            console.log("HERE");

            const newData = data.new as Private_Messages;

            const newPrivateChats = [...privateChats];

            newPrivateChats
              .find((chat) => chat.privateChat.id === newData.chat)
              ?.privateChat.messages.push(newData);

            setPrivateChats(newPrivateChats);
          }
        )
        .subscribe(),
    subscribeMessagesUpdate: (
      client: ReturnType<typeof supabaseClient>,
      privateChats: ChatContextType["privateChats"],
      setPrivateChats: ChatContextType["setPrivateChats"]
    ) =>
      client
        .channel("private_messages_update")
        .on(
          "postgres_changes",
          createFilter("UPDATE", "private_messages"),
          (data) => {
            if (!data.new) {
              return;
            }

            setPrivateChats([
              ...privateChats.map(
                (each) =>
                  ({
                    ...each,
                    privateChat: {
                      ...each.privateChat,
                      messages: each.privateChat.messages.map((message) => ({
                        ...message,
                        is_read: true,
                      })),
                    },
                  } as ChatContextType["privateChats"][number])
              ),
            ]);
          }
        )
        .subscribe(),
    subscribeRemoveChat: (
      client: ReturnType<typeof supabaseClient>,
      privateChats: ChatContextType["privateChats"],
      setPrivateChats: ChatContextType["setPrivateChats"]
    ) =>
      client
        .channel("private_chats_remove")
        .on(
          "postgres_changes",
          createFilter("DELETE", "private_chats"),
          (data) => {
            const oldData = data.old as Private_Chats;

            console.log(data);

            setPrivateChats(
              [...privateChats].filter(
                (privateChat) => privateChat.privateChat.id !== oldData.id
              )
            );
          }
        )
        .subscribe(),
  },
  contactRequest: {
    subscribeNewRequests: (
      client: ReturnType<typeof supabaseClient>,
      contactRequests: ChatContextType["contactRequests"],
      setContactRequests: ChatContextType["setContactRequests"]
    ) =>
      client
        .channel("contact_requests_new")
        .on(
          "postgres_changes",
          createFilter("INSERT", "contact_requests"),
          async (data) => {
            if (!data.new) {
              return;
            }

            const {
              data: { user },
            } = await client.auth.getUser();

            if (!user) {
              return;
            }

            const newData = data.new as Contact_Requests;

            const targetUser =
              user.id === newData.user_from
                ? newData.user_to
                : newData.user_from;

            const targetUserData = await getUserContact(targetUser);

            if (!targetUserData) {
              return;
            }

            const newContactRequests = [...contactRequests];

            newContactRequests.push({
              id: newData.id,
              created_at: newData.created_at,
              from: {
                id: newData.user_from,
              },
              targetUser: { ...targetUserData, id: targetUser },
            });

            setContactRequests(newContactRequests);
          }
        )
        .subscribe(),
    subscribeRemoveRequests: (
      client: ReturnType<typeof supabaseClient>,
      contactRequests: ChatContextType["contactRequests"],
      setContactRequests: ChatContextType["setContactRequests"],
      contacts: ChatContextType["contacts"],
      setContacts: ChatContextType["setContacts"],
      setPrivateChats: ChatContextType["setPrivateChats"]
    ) =>
      client
        .channel("contact_requests_remove")
        .on(
          "postgres_changes",
          createFilter("DELETE", "contact_requests"),
          async (data) => {
            if (!data.old) {
              return;
            }

            const oldData = data.old as Contact_Requests;

            setContactRequests(
              contactRequests.filter((request) => request.id !== oldData.id)
            );

            setContacts(
              contacts.filter((contact) => contact.requestId !== oldData.id)
            );

            setPrivateChats((prev) =>
              prev.filter(
                (chat) =>
                  chat.targetUser.id === oldData.user_from ||
                  chat.targetUser.id === oldData.user_to
              )
            );
          }
        )
        .subscribe(),
    subscribeUpdateRequests: (
      client: ReturnType<typeof supabaseClient>,
      contactRequests: ChatContextType["contactRequests"],
      setContactRequests: ChatContextType["setContactRequests"],
      contacts: ChatContextType["contacts"],
      setContacts: ChatContextType["setContacts"]
    ) =>
      client
        .channel("contact_requests_update")
        .on(
          "postgres_changes",
          createFilter("UPDATE", "contact_requests"),
          async (data) => {
            if (!data.new) {
              return;
            }

            const newData = data.new as Contact_Requests;
            const oldData = data.old as Contact_Requests;

            if (!oldData.accepted && newData.accepted) {
              // Request was accepted

              const findRequest = contactRequests.find(
                (request) => request.id === newData.id
              );

              if (!findRequest) {
                return;
              }

              const newContacts = [...contacts];
              const { id, targetUser } = findRequest;

              // TODO: Use ID from contacts instead of contact_requests

              newContacts.push({
                ...targetUser,
                id: targetUser.id,
                requestId: id,
                userId: targetUser.id,
              });

              setContacts(newContacts);

              const newContactRequests = [...contactRequests];

              setContactRequests(
                newContactRequests.filter(
                  (request) => request.id !== newData.id
                )
              );
            }
          }
        )
        .subscribe(),
  },
} as const;

export default chatSubscriptions;
