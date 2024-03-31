import { Contacts } from "@/lib/apollo/__generated__/graphql/graphql";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar";
import { Trash2 } from "lucide-react";
import { Button } from "../atoms/Button";
import SimpleAlertDialog from "./SimpleAlertDialog";
import useChat from "../../hooks/useChat";
import { useMemo } from "react";

type ContactItemProps = Pick<
  Contacts,
  "id" | "avatar" | "display_name" | "online" | "code"
> & {
  userId: string;
  requestId: string;
};

export default function ContactItem({
  requestId,
  userId,
  display_name,
  online,
  avatar,
  code,
}: ContactItemProps) {
  const {
    actions: { openChat },
    privateChats,
  } = useChat();

  const chatId = useMemo(
    () =>
      privateChats.find((privateChat) => privateChat.targetUser.code === code)
        ?.privateChat.id,
    [code, privateChats]
  );

  return (
    <div
      className="flex bg-slate-900 my-2 rounded-md py-2 px-2 border-2 items-center cursor-pointer duration-200 transition-transform hover:scale-105"
      onClick={() => openChat(chatId, userId)}
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
          <span className="text-slate-400 text-sm">#{code}</span>
        </div>
      </div>
      <DeleteRequestAlert requestId={requestId} display_name={display_name}>
        <div className="relative">
          <Button
            className="absolute -translate-x-full -translate-y-2/4 p-1"
            variant={"destructive"}
          >
            <Trash2 />
          </Button>
        </div>
      </DeleteRequestAlert>
    </div>
  );
}

function DeleteRequestAlert({
  children,
  requestId,
  display_name,
}: React.PropsWithChildren<{
  requestId: string;
  display_name: string;
}>) {
  const {
    actions: { deleteContact },
  } = useChat();

  return (
    <SimpleAlertDialog
      trigger={children}
      title="Are you sure?"
      cancel="Cancel"
      confirm={{
        label: "Delete",
        variant: "destructive",
        handleClick: () => deleteContact(requestId),
      }}
      description={
        <>
          This action will remove{" "}
          <span className="text-red-300">{display_name}</span> from your
          contacts!
        </>
      }
    />
  );
}
