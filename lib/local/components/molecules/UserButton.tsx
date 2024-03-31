"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar";
import { Home, LogOut, MessageCircle, UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import { useMemo } from "react";

type UserButtonProps = {
  dropdown?: {
    menuProps?: Parameters<typeof DropdownMenuContent>["0"];
  };
};

export default function UserButton({ dropdown }: UserButtonProps) {
  const { user, handleSignOut: handleClose } = useAuth();
  const { push } = useRouter();
  const pathname = usePathname();
  const menuProps: NonNullable<
    NonNullable<UserButtonProps["dropdown"]>["menuProps"]
  > = useMemo(() => {
    let result: NonNullable<
      NonNullable<UserButtonProps["dropdown"]>["menuProps"]
    > = {
      className: "w-64",
      align: "end",
    };

    if (dropdown?.menuProps) {
      result = {
        ...result,
        className: `w-64 ${dropdown.menuProps.className ?? ""}`,
        ...dropdown.menuProps,
      };
    }

    return result;
  }, [dropdown?.menuProps]);

  if (!user) {
    return (
      <Avatar className="border-background border-solid border-2 cursor-pointer">
        <AvatarFallback>{"?"}</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Avatar className="border-background border-solid border-2 cursor-pointer">
            <AvatarImage src={user.id} />
            <AvatarFallback>{user.id[0]}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent {...menuProps}>
          <DropdownMenuLabel className="text-center text-slate-400">
            {user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Edit Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuItem onClick={() => push("/chats")}>
            <MessageCircle className="mr-2 h-4 w-4" />
            <span>Chat</span>
          </DropdownMenuItem>
          {pathname.includes("/chats") && (
            <DropdownMenuItem onClick={() => push("/")}>
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-rose-400"
            onClick={() => handleClose()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
