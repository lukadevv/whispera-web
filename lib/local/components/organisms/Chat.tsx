import { ArrowLeft, Cross, Forward, Smile, X } from "lucide-react";
import ChatOtherMessage, {
  ChatOtherMessageProps,
} from "../molecules/ChatOtherMessage";
import ChatSelfMessage, {
  ChatSelfMessageProps,
} from "../molecules/ChatSelfMessage";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../molecules/Card";
import { Textarea } from "../atoms/Textarea";
import useChat from "../../hooks/useChat";
import { Private_Chats } from "@/lib/apollo/__generated__/graphql/graphql";
import { useCallback, useEffect, useRef, useState } from "react";
import { readChat } from "../../actions/chat.actions";
import { Button } from "../atoms/Button";

type ChatProps = {
  id: Private_Chats["id"];
  contact: {
    userId: string;
    avatar?: string;
    display_name: string;
    online: boolean;
  };
  messages: (
    | (Omit<ChatOtherMessageProps, "avatar"> & { type: "other" })
    | (ChatSelfMessageProps & { type: "self" })
  )[];
  card?: {
    className: string;
  };
  content?: {
    className: string;
  };
  autoRead?: boolean;
};

export default function Chat({
  id,
  card,
  content,
  messages,
  contact,
  autoRead,
}: ChatProps) {
  const chatRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const {
    actions: { sendMessage, closeChat },
  } = useChat();

  const handleSendMessage = useCallback(() => {
    if (message.length < 1 || message.length > 512) {
      return;
    }

    sendMessage(contact.userId, message);
    setMessage("");
  }, [contact.userId, message, sendMessage]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const scrollToBottom = useCallback(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  // Scroll to down after render
  useEffect(scrollToBottom, [scrollToBottom, messages]);

  // Update messages after render and listen to new messages
  useEffect(() => {
    autoRead && readChat(id);
  }, [autoRead, id, messages.length]);

  return (
    <Card className={`bg-gray-800 ${card?.className ?? ""}`}>
      <CardHeader className="m-0 p-0 border-b-2">
        <div className="relative mr-1">
          <Button
            className="p-1 absolute left-full -translate-x-full translate-y-1"
            variant={"ghost"}
            onClick={() => closeChat()}
          >
            <X size={"22px"} />
          </Button>
        </div>
        <CardDescription className="mt-2">
          <div className="flex items-center gap-3 pb-3 ml-2">
            <ArrowLeft className="md:hidden" />
            <div className="flex items-center gap-2">
              <div className="relative">
                <Avatar className="border-background border-solid border-2">
                  <AvatarImage src={contact.avatar} />
                  <AvatarFallback>{contact.display_name[0]}</AvatarFallback>
                </Avatar>
                <span
                  className={`absolute w-3 h-3 rounded-full right-0 bottom-0 border-1 border-white ${
                    contact.online ? "bg-green-400" : "bg-red-400"
                  }`}
                />
              </div>
              <p className="text-base text-gray-300">{contact.display_name}</p>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent
        className={`overflow-auto border-b-2 bg-background h-96 p-0 m-0 pt-3 pl-2 ${
          content?.className ?? ""
        }`}
        ref={chatRef}
      >
        {messages.map((message) =>
          message.type === "self" ? (
            <ChatSelfMessage key={message.message} {...message} />
          ) : (
            <ChatOtherMessage
              key={message.message}
              avatar={contact.avatar}
              {...message}
            />
          )
        )}
      </CardContent>
      <CardFooter className="flex-2 p-0 mb-1 mx-1 mt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            handleSendMessage();
          }}
          className="write shadow flex rounded-lg w-full"
        >
          <div className="flex-3 flex content-center items-center text-center px-4">
            <span className="block text-center text-gray-400 hover:text-gray-800">
              <Smile />
            </span>
          </div>
          <div className="w-full">
            <Textarea
              name="message"
              className="min-h-0 w-full h-12 block outline-none py-2 px-4 bg-transparent border font-semibold text-lg border-gray-300 rounded-md resize-none text-gray-300"
              placeholder="Type a message..."
              onKeyDown={handleKeyDown}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="flex mx-3 items-center justify-center">
            <button
              className="bg-primary w-10 h-10 rounded-full inline-block"
              type="submit"
            >
              <span className="inline-block align-text-bottom">
                <Forward />
              </span>
            </button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
