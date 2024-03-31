import ChatDynamicPage from "@/lib/local/components/pages/ChatDynamicPage";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Chat() {
  const supabase = supabaseServer(false);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return <ChatDynamicPage />;
}
