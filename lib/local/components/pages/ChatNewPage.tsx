"use client";

import { useEffect, useState } from "react";
import useChat from "../../hooks/useChat";
import Chat from "../organisms/Chat";
import { useRouter } from "next/navigation";

type ChatNewPageProps = {
  user: string;
};

export default function ChatNewPage({ user }: ChatNewPageProps) {
  const [value, setValue] = useState<React.ComponentProps<typeof Chat>>();
  const { contactRequests, contacts, privateChats } = useChat();
  const { push } = useRouter();

  useEffect(() => {
    const request = contacts.find((each) => each.userId === user);

    if (!request) {
      return push("/chats");
    }

    const from = request;

    setValue({
      id: `new_chat_${from.id}`,
      contact: {
        ...from,
        avatar: from.avatar ?? undefined,
      },
      messages: [],
    });
  }, [contactRequests, contacts, push, user]);

  useEffect(() => {
    for (const each of privateChats) {
      if (each.targetUser.id === user) {
        push(`/chats/${each.privateChat.id}`);
        break;
      }
    }
  }, [privateChats, push, user]);

  if (!value) {
    return <></>;
  }

  return (
    <Chat
      card={{
        className: "h-[95.6vh] max-md:h-[98vh]",
      }}
      content={{
        className: "h-[81vh] max-md:h-[84.5vh]",
      }}
      {...value}
    />
  );
}
