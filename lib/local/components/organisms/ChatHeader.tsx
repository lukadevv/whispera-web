"use client";

import { Copy, Eye, EyeOff, UserPlus2 } from "lucide-react";
import { Button } from "../atoms/Button";
import { Card } from "../molecules/Card";
import UserButton from "../molecules/UserButton";
import SendRequestDialog from "../molecules/SendRequestDialog";
import { Contacts } from "@/lib/apollo/__generated__/graphql/graphql";
import { useCallback, useState } from "react";
import { useToast } from "../../hooks/useToast";

export type ChatHeaderProps = {
  contact: Pick<Contacts, "code" | "display_name">;
};

export default function ChatHeader({
  contact: { display_name, code },
}: ChatHeaderProps) {
  const [showCode, setShowCode] = useState<boolean>(false);

  const { toast } = useToast();

  const handleCopy = useCallback(
    () =>
      navigator.clipboard.writeText(code).then(() =>
        toast({
          title: "Copied",
          description: "Code was copied to your clipboard!",
        })
      ),
    [code, toast]
  );

  const handleShowToggle = useCallback(() => setShowCode((prev) => !prev), []);

  return (
    <Card className="flex justify-between bg-slate-800 px-2 items-center">
      <div className="flex gap-3">
        <UserButton
          dropdown={{
            menuProps: {
              align: "start",
            },
          }}
        />
        <div className="justify-center flex flex-col">
          <p className="text-sm text-gray-200">{display_name}</p>
          <div className="flex gap-1 items-center">
            <p className={`text-xs text-gray-500 w-[78px] font-extrabold`}>
              {showCode ? `#${code}` : "#????????"}
            </p>
            <div className="flex gap-2">
              {showCode ? (
                <Eye
                  size={"15px"}
                  className="text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => handleShowToggle()}
                />
              ) : (
                <EyeOff
                  size={"15px"}
                  className="text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => handleShowToggle()}
                />
              )}
              <Copy
                size={"15px"}
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                onClick={() => handleCopy()}
              />
            </div>
          </div>
        </div>
      </div>
      <SendRequestDialog>
        <div className="flex gap-2">
          <Button variant={"secondary"}>
            <UserPlus2 />
          </Button>
        </div>
      </SendRequestDialog>
    </Card>
  );
}
