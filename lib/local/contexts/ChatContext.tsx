import {
  Contact_Requests,
  Contacts,
  Private_Chats,
  Private_Messages,
} from "@/lib/apollo/__generated__/graphql/graphql";
import { createContext } from "react";

type PrivateChatListItem = {
  targetUser: Pick<
    Contacts,
    "id" | "avatar" | "display_name" | "online" | "code"
  >;
  privateChat: Pick<Private_Chats, "id"> & {
    messages: Pick<
      Private_Messages,
      "id" | "message" | "created_at" | "is_edit" | "is_read" | "send_by"
    >[];
    isTyping: boolean;
  };
};

type ContactItem = Pick<
  Contacts,
  "id" | "code" | "avatar" | "display_name" | "online"
> & {
  userId: string;
  requestId: string;
};

type ContactRequestItem = Pick<Contact_Requests, "id" | "created_at"> & {
  targetUser: Pick<
    Contacts,
    "id" | "code" | "avatar" | "display_name" | "online"
  >;
  from: Pick<Contacts, "id">;
};

type ChatActions = {
  sendMessage: (
    userToId: string,
    message: Private_Messages["message"]
  ) => Promise<boolean>;
  sendRequest: (code: Contacts["code"]) => Promise<boolean>;
  acceptRequest: (requestId: Contact_Requests["id"]) => Promise<boolean>;
  denyRequest: (requestId: Contact_Requests["id"]) => Promise<boolean>;
  cancelRequest: (requestId: Contact_Requests["id"]) => Promise<boolean>;
  deleteContact: (requestId: Contact_Requests["id"]) => Promise<boolean>;
  openChat: (
    chatId: Private_Chats["id"] | undefined,
    userTo: string
  ) => Promise<void>;
  closeChat: () => Promise<void>;
  isChatActive: (
    chatId: Private_Chats["id"] | undefined,
    userTo: string
  ) => boolean;
};

export type ChatContextType = {
  privateChats: PrivateChatListItem[];
  contacts: ContactItem[];
  contactRequests: ContactRequestItem[];
  setPrivateChats: React.Dispatch<React.SetStateAction<PrivateChatListItem[]>>;
  setContacts: React.Dispatch<React.SetStateAction<ContactItem[]>>;
  setContactRequests: React.Dispatch<
    React.SetStateAction<ContactRequestItem[]>
  >;
  actions: ChatActions;
};

export const ChatContext = createContext<ChatContextType>({
  privateChats: [],
  contacts: [],
  setPrivateChats: () => {},
  setContacts: () => {},
  setContactRequests: () => {},
  contactRequests: [],
  actions: {
    sendMessage: async () => true,
    sendRequest: async () => true,
    acceptRequest: async () => true,
    denyRequest: async () => true,
    cancelRequest: async () => true,
    deleteContact: async () => true,
    openChat: async () => {},
    closeChat: async () => {},
    isChatActive: () => false,
  },
});
