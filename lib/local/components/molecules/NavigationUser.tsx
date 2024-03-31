"use client";

import { Button } from "@/lib/local/components/atoms/Button";
import { supabaseClient } from "@/lib/supabase/client";
import { User as UserIcon } from "lucide-react";
import { useCallback } from "react";
import useAuth from "../../hooks/useAuth";

import UserButton from "./UserButton";

export default function NavigationUser() {
  const { user } = useAuth();

  return <div className="my-1">{user ? <UserButton /> : <NotUser />}</div>;
}

function NotUser() {
  const handleLoginWithGoogle = useCallback(() => {
    const supabase = supabaseClient();

    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
        scopes: "openid",
      },
    });
  }, []);

  return (
    <Button
      variant={"default"}
      onClick={() => {
        handleLoginWithGoogle();
      }}
    >
      <UserIcon className="mr-1" size={"1rem"} />
      <p>Sign In</p>
    </Button>
  );
}
