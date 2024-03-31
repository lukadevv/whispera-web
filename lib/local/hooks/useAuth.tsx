"use client";

import { supabaseClient } from "@/lib/supabase/client";
import { useCallback, useContext } from "react";
import { AuthUserContext } from "../contexts/AuthUserContext";

export default function useAuth() {
  const { user, setUser } = useContext(AuthUserContext);

  const handleSignOut = useCallback(() => {
    supabaseClient()
      .auth.signOut()
      .then(({ error }) => {
        if (!error) {
          setUser(undefined);
        }
      });
  }, [setUser]);

  return { user, handleSignOut };
}
