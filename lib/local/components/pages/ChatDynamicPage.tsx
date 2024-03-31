"use client";

import { useEffect, useMemo } from "react";
import useChat from "../../hooks/useChat";
import Chat from "../organisms/Chat";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";

export default function ChatDynamicPage() {
  const { privateChats } = useChat();
  const { user } = useAuth();
  const pathname = usePathname();
  const { push } = useRouter();

  const props = useMemo(
    () =>
      privateChats.find((chat) => `/chats/${chat.privateChat.id}` === pathname),
    [pathname, privateChats]
  );

  useEffect(() => {
    // Redirect if not found
    if (!user || !props) {
      push("/chats");
    }
  }, [props, push, user]);

  if (!user || !props) {
    return <></>;
  }

  const {
    privateChat,
    targetUser: { id, avatar, display_name, online },
  } = props;

  return (
    <Chat
      id={privateChat.id}
      card={{
        className: "h-[95.6vh] max-md:h-[98vh]",
      }}
      content={{
        className: "h-[81vh] max-md:h-[84.5vh]",
      }}
      contact={{
        userId: id,
        avatar: avatar as string | undefined,
        display_name,
        online,
      }}
      messages={privateChat.messages.map((message) => ({
        type: message.send_by === user?.id ? "self" : "other",
        date: new Date(message.created_at),
        display_name,
        message: message.message,
      }))}
      autoRead
    />
  );
}
