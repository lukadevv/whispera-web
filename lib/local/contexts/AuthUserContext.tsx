import { User } from "@supabase/supabase-js";
import { createContext } from "react";

export type AuthUserContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<AuthUserContextType["user"]>>;
};

export const AuthUserContext = createContext<AuthUserContextType>({
  setUser: () => {},
});
