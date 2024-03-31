"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChatContext, ChatContextType } from "../contexts/ChatContext";
import { usePathname, useRouter } from "next/navigation";
import {
  acceptRequest as acceptRequestAction,
  cancelRequest as cancelRequestAction,
  deleteContact as deleteContactAction,
  denyRequest as denyRequestAction,
  getInitialChat,
  sendMessage as sendMessageAction,
  sendRequest as sendRequestAction,
} from "../actions/chat.actions";
import ChatLoadingScreen from "../components/molecules/ChatLoadingScreen";

export type ChatProviderProps = React.PropsWithChildren;

export default function ChatProvider({ children }: ChatProviderProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [privateChats, setPrivateChats] = useState<
    ChatContextType["privateChats"]
  >([]);
  const [contacts, setContacts] = useState<ChatContextType["contacts"]>([]);
  const [contactRequests, setContactRequests] = useState<
    ChatContextType["contactRequests"]
  >([]);
  const pathname = usePathname();

  const { push } = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setLoading(true);
    getInitialChat().then((data) => {
      // Update chat
      setPrivateChats(data.privateChats);
      setContactRequests(data.contactRequest);
      setContacts(data.contacts);

      setLoading(false);
    });
  }, []);

  const sendMessage = useCallback<ChatContextType["actions"]["sendMessage"]>(
    sendMessageAction,
    []
  );

  const sendRequest = useCallback<ChatContextType["actions"]["sendRequest"]>(
    sendRequestAction,
    []
  );

  const deleteContact = useCallback<
    ChatContextType["actions"]["deleteContact"]
  >(deleteContactAction, []);

  const acceptRequest = useCallback<
    ChatContextType["actions"]["acceptRequest"]
  >(acceptRequestAction, []);

  const cancelRequest = useCallback<
    ChatContextType["actions"]["cancelRequest"]
  >(cancelRequestAction, []);

  const denyRequest = useCallback<ChatContextType["actions"]["denyRequest"]>(
    denyRequestAction,
    []
  );

  const openChat = useCallback<ChatContextType["actions"]["openChat"]>(
    async (chatId, userTo) => {
      if (
        chatId ||
        privateChats.some(
          (privateChat) => privateChat.privateChat.id === chatId
        )
      ) {
        push(`/chats/${chatId}`);
      } else {
        push(`/chats/new/${userTo}`);
      }
    },
    [privateChats, push]
  );

  const closeChat = useCallback<
    ChatContextType["actions"]["closeChat"]
  >(async () => {
    push("/chats");
  }, [push]);

  const isChatActive = useCallback<ChatContextType["actions"]["isChatActive"]>(
    (chatId, userId) => {
      if (chatId) {
        return pathname.includes(`/chats/${chatId}`);
      }

      return pathname.includes(`/chats/new/${userId}`);
    },
    [pathname]
  );

  const value = useMemo<ChatContextType>(
    () => ({
      privateChats,
      contacts,
      contactRequests,
      setPrivateChats,
      setContacts,
      setContactRequests,
      actions: {
        sendMessage,
        sendRequest,
        acceptRequest,
        deleteContact,
        cancelRequest,
        denyRequest,
        openChat,
        closeChat,
        isChatActive,
      },
    }),
    [
      acceptRequest,
      cancelRequest,
      closeChat,
      contactRequests,
      contacts,
      deleteContact,
      denyRequest,
      isChatActive,
      openChat,
      privateChats,
      sendMessage,
      sendRequest,
    ]
  );

  if (loading) {
    return <ChatLoadingScreen />;
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
