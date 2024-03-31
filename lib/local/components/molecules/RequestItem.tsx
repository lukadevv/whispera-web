import {
  Contact_Requests,
  Contacts,
} from "@/lib/apollo/__generated__/graphql/graphql";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar";
import { Check, Trash2, X } from "lucide-react";
import { Button } from "../atoms/Button";
import SimpleAlertDialog from "./SimpleAlertDialog";
import useChat from "../../hooks/useChat";

type RequestItemProps = {
  request: Pick<Contact_Requests, "id"> & {
    type: "outgoing" | "incoming";
  };
  targetUser: Pick<Contacts, "avatar" | "display_name" | "code">;
};

export default function RequestItem({
  targetUser: { display_name, avatar, code },
  request: { id, type },
}: RequestItemProps) {
  return (
    <div className="flex bg-slate-900 my-2 rounded-md py-2 px-2 border-2 items-center cursor-pointer duration-200 transition-transform hover:scale-105">
      <div className="flex-2">
        <div className="relative">
          <Avatar className="border-background border-solid border-2 cursor-pointer">
            <AvatarImage src={avatar ?? "not_found.png"} />
            <AvatarFallback>{display_name.at(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex-1 px-2">
        <div className="truncate w-32">
          <span className="text-gray-200">{display_name}</span>
        </div>
        <div className="truncate w-32">
          <span className="text-slate-400 text-sm">#{code}</span>
          <span className="text-red-400 text-sm ml-1 uppercase">
            {type === "outgoing" ? "sent" : "pending"}
          </span>
        </div>
      </div>
      <div className="relative">
        {type === "outgoing" ? (
          <CancelRequestAlert id={id} display_name={display_name}>
            <Button
              className="absolute -translate-x-full -translate-y-2/3 p-1"
              variant={"destructive"}
            >
              <Trash2 />
            </Button>
          </CancelRequestAlert>
        ) : (
          <div className="absolute -translate-x-full -translate-y-2/4 flex gap-1">
            <DenyRequestAlert id={id} display_name={display_name}>
              <Button className="p-1" variant={"destructive"}>
                <X />
              </Button>
            </DenyRequestAlert>
            <AcceptRequestAlert id={id} display_name={display_name}>
              <Button className="p-1" variant={"default"}>
                <Check />
              </Button>
            </AcceptRequestAlert>
          </div>
        )}
      </div>
    </div>
  );
}

function CancelRequestAlert({
  children,
  id,
  display_name,
}: React.PropsWithChildren<{
  id: string;
  display_name: string;
}>) {
  const {
    actions: { cancelRequest },
  } = useChat();

  return (
    <SimpleAlertDialog
      trigger={children}
      title="Are you sure?"
      cancel="Cancel"
      confirm={{
        label: "Confirm",
        variant: "destructive",
        handleClick: () => cancelRequest(id),
      }}
      description={
        <>
          This action will cancel the request to{" "}
          <span className="text-red-300">{display_name}</span>
        </>
      }
    />
  );
}

function AcceptRequestAlert({
  children,
  id,
  display_name,
}: React.PropsWithChildren<{
  id: string;
  display_name: string;
}>) {
  const {
    actions: { acceptRequest },
  } = useChat();

  return (
    <SimpleAlertDialog
      trigger={children}
      title="Are you sure?"
      cancel="Cancel"
      confirm={{
        label: "Accept",
        handleClick: () => acceptRequest(id),
      }}
      description={
        <>
          This action will accept the request to{" "}
          <span className="text-red-300">{display_name}</span>. Once request is
          accepted a private chat can be started
        </>
      }
    />
  );
}

function DenyRequestAlert({
  children,
  id,
  display_name,
}: React.PropsWithChildren<{
  id: string;
  display_name: string;
}>) {
  const {
    actions: { denyRequest },
  } = useChat();

  return (
    <SimpleAlertDialog
      trigger={children}
      title="Are you sure?"
      cancel="Cancel"
      confirm={{
        label: "Deny",
        variant: "destructive",
        handleClick: () => denyRequest(id),
      }}
      description={
        <>
          This action will deny the request to{" "}
          <span className="text-red-300">{display_name}</span>.
        </>
      }
    />
  );
}
