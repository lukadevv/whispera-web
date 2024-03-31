"use client";

import chatSubscriptions from "@/lib/local/actions/chat.subscriptions";
import useChat from "@/lib/local/hooks/useChat";
import { supabaseClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function Template({ children }: React.PropsWithChildren) {
  const {
    privateChats,
    setPrivateChats,
    contactRequests,
    setContactRequests,
    contacts,
    setContacts,
  } = useChat();

  useEffect(() => {
    const client = supabaseClient();

    const privateChatMessagesSubscription =
        chatSubscriptions.privateChat.subscribeNewMessages(
          client,
          privateChats,
          setPrivateChats
        ),
      privateChatNewSubscription =
        chatSubscriptions.privateChat.subscribeNewPrivateChats(
          client,
          contacts,
          setPrivateChats
        ),
      privateChatMessagesUpdateSubscription =
        chatSubscriptions.privateChat.subscribeMessagesUpdate(
          client,
          privateChats,
          setPrivateChats
        ),
      privateChatRemoveMessagesSubscription =
        chatSubscriptions.privateChat.subscribeRemoveChat(
          client,
          privateChats,
          setPrivateChats
        ),
      contactRequestsSubscription =
        chatSubscriptions.contactRequest.subscribeNewRequests(
          client,
          contactRequests,
          setContactRequests
        ),
      contactRequestRemoveSubscription =
        chatSubscriptions.contactRequest.subscribeRemoveRequests(
          client,
          contactRequests,
          setContactRequests,
          contacts,
          setContacts,
          setPrivateChats
        ),
      contactRequestUpdateSubscription =
        chatSubscriptions.contactRequest.subscribeUpdateRequests(
          client,
          contactRequests,
          setContactRequests,
          contacts,
          setContacts
        );

    return () => {
      // Dispose
      privateChatMessagesSubscription.unsubscribe();
      privateChatMessagesUpdateSubscription.unsubscribe();
      privateChatRemoveMessagesSubscription.unsubscribe();
      contactRequestsSubscription.unsubscribe();
      contactRequestRemoveSubscription.unsubscribe();
      contactRequestUpdateSubscription.unsubscribe();
      privateChatNewSubscription.unsubscribe();
    };
  }, [
    contactRequests,
    contacts,
    privateChats,
    setContactRequests,
    setContacts,
    setPrivateChats,
  ]);

  return children;
}
