import {
  Contacts,
  Private_Chats,
  Private_Messages,
} from "@/lib/apollo/__generated__/graphql/graphql";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar";
import { useMemo } from "react";
import useChat from "../../hooks/useChat";

type ChatItemProps = {
  privateChat: Pick<Private_Chats, "id"> & {
    messages: Pick<
      Private_Messages,
      "id" | "message" | "is_edit" | "is_read" | "created_at"
    >[];
  };
  targetUser: Pick<Contacts, "id" | "avatar" | "online" | "display_name">;
  isTyping: boolean;
  newMessages?: number;
};

export default function ChatItem({
  privateChat: { id, messages },
  targetUser: { display_name, online, avatar, id: userId },
  newMessages,
  isTyping,
}: ChatItemProps) {
  const lastMessage = useMemo<
    ChatItemProps["privateChat"]["messages"][number] | undefined
  >(() => {
    return messages[messages.length - 1];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, messages.length]);

  const description = useMemo(
    () => (isTyping ? "Is typing..." : lastMessage?.message ?? ""),
    [isTyping, lastMessage]
  );

  const {
    actions: { openChat, isChatActive },
  } = useChat();

  return (
    <div
      className={`flex ${
        isChatActive(id, userId) ? "bg-slate-700" : "bg-slate-900"
      } my-2 rounded-md py-2 px-2 border-2 items-center cursor-pointer hover:scale-105 duration-200 transition-transform`}
      onClick={() => openChat(id, userId)}
    >
      <div className="flex-2">
        <div className="relative">
          <Avatar className="border-background border-solid border-2 cursor-pointer">
            <AvatarImage src={avatar ?? "not_found.png"} />
            <AvatarFallback>{display_name.at(0)}</AvatarFallback>
          </Avatar>
          <span
            className={`absolute w-3 h-3 rounded-full right-0 bottom-0 border-1 border-white ${
              online ? "bg-green-400" : "bg-red-400"
            }`}
          ></span>
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="truncate w-32">
          <span className="text-gray-200">{display_name}</span>
        </div>
        <div className="truncate w-32">
          <span className="text-slate-400 text-sm">{description}</span>
        </div>
      </div>
      <div className="relative mr-1">
        <div className="flex-2 text-right">
          <div>
            <small className="text-gray-500">
              {new Date(lastMessage?.created_at ?? "").toLocaleString()}
            </small>
          </div>
          <div className={!newMessages ? "opacity-0" : ""}>
            <small className="text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block">
              {newMessages}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
