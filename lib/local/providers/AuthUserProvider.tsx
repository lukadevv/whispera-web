import { useEffect, useMemo, useState } from "react";
import {
  AuthUserContext,
  AuthUserContextType,
} from "../contexts/AuthUserContext";
import { supabaseClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export function AuthUserProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<User>();
  const value = useMemo<AuthUserContextType>(
    () => ({
      user,
      setUser,
    }),
    [user]
  );

  useEffect(() => {
    const initUser = async () => {
      const {
        data: { session },
      } = await supabaseClient().auth.getSession();

      if (session) {
        setUser(session.user);
      }
    };

    initUser();
  }, [setUser]);

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  );
}
