"use client";

import useChat from "../../hooks/useChat";
import SearchInput from "../atoms/SearchInput";
import { Card, CardContent, CardHeader } from "../molecules/Card";
import ChatItem from "../molecules/ChatItem";

type ChatListProps = {
  card?: {
    className: Parameters<typeof Card>[0]["className"];
  };
  content?: {
    className: Parameters<typeof CardContent>[0]["className"];
  };
};

export default function ChatList({ card, content }: ChatListProps) {
  const { privateChats } = useChat();

  return (
    <Card className={`pr-6 m-0 p-0 bg-slate-800 ${card?.className ?? ""}`}>
      <CardHeader className="search flex-2 p-0 m-0 pb-1 px-4">
        <SearchInput placeholder="Search for chats" />
      </CardHeader>
      <CardContent
        className={`flex-1 mb-0 mt-1 py-0 px-4 overflow-x-hidden overflow-y-auto h-[92%] ${
          content?.className ?? ""
        }`}
      >
        {privateChats.map((each) => (
          <ChatItem
            key={each.targetUser.id}
            isTyping={false}
            privateChat={{
              id: each.privateChat.id,
              messages: each.privateChat.messages,
            }}
            targetUser={each.targetUser}
            newMessages={each.privateChat.messages.reduce(
              (counter, message) =>
                counter +
                (!message.is_read && message.send_by === each.targetUser.id
                  ? 1
                  : 0),
              0
            )}
          />
        ))}
      </CardContent>
    </Card>
  );
}
