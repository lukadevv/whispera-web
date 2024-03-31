"use client";

import { useMemo } from "react";
import useChat from "../../hooks/useChat";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../molecules/Tabs";
import ChatHeader, { ChatHeaderProps } from "../organisms/ChatHeader";
import ChatList from "../organisms/ChatList";
import ContactList from "../organisms/ContactList";
import RequestList from "../organisms/RequestList";
import useAuth from "../../hooks/useAuth";

export default function ChatTemplate({
  children,
  header,
}: React.PropsWithChildren<{
  header: ChatHeaderProps;
}>) {
  return (
    <div className="flex h-min-[100vh] items-center min-md:h-[100vh] md:m-4 max-md:my-2">
      <SideChat header={header} />
      <main className="w-full p-0 mx-2">{children}</main>
    </div>
  );
}

function SideChat({ header }: { header: ChatHeaderProps }) {
  const { contactRequests, privateChats } = useChat();
  const { user } = useAuth();

  const totalReceived = useMemo(
    () =>
      contactRequests.reduce(
        (counter, each) => counter + (user && each.from.id !== user.id ? 1 : 0),
        0
      ),
    [contactRequests, user]
  );

  const totalNewMessages = useMemo(
    () =>
      privateChats.reduce(
        (counter, each) =>
          counter +
          (each.privateChat.messages.some(
            (message) => message.send_by !== user?.id && !message.is_read
          )
            ? 1
            : 0),
        0
      ),
    [privateChats, user?.id]
  );

  return (
    <div className="flex flex-col gap-2 max-md:hidden">
      <ChatHeader {...header} />
      <Tabs defaultValue={"chats"} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="chats">
            <div className="flex relative">
              Chats
              <div
                className={`absolute left-full translate-x-1/2 -translate-y-2/3 w-full ${
                  totalNewMessages ? "" : "opacity-0"
                }`}
              >
                <small className="text-xs bg-red-500 text-white rounded-full h-5 w-5 leading-5 text-center inline-block">
                  {Math.min(totalNewMessages, 99)}
                </small>
              </div>
            </div>
          </TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="requests">
            <div className="flex relative">
              Requests
              <div
                className={`absolute left-1/2 translate-x-1/2 -translate-y-2/3 w-full ${
                  totalReceived ? "" : "opacity-0"
                }`}
              >
                <small className="text-xs bg-red-500 text-white rounded-full h-5 w-5 leading-5 text-center inline-block">
                  {Math.min(totalReceived, 99)}
                </small>
              </div>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chats">
          <ChatList
            card={{
              className: "h-[85.5vh] min-w-[315px]",
            }}
          />
        </TabsContent>
        <TabsContent value="contacts">
          <ContactList
            card={{
              className: "h-[85.5vh] min-w-[315px]",
            }}
          />
        </TabsContent>
        <TabsContent value="requests">
          <RequestList
            card={{
              className: "h-[85.5vh] min-w-[315px]",
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
