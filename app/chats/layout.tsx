"use server";

import { Contacts } from "@/lib/apollo/__generated__/graphql/graphql";
import ChatTemplate from "@/lib/local/components/templates/ChatTemplate";
import ChatProvider from "@/lib/local/providers/ChatProvider";
import { supabaseServer } from "@/lib/supabase/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = (await supabaseServer(false).rpc("myContact"))
    .data as Contacts | null;

  return (
    <ChatProvider>
      <ChatTemplate
        header={{
          contact: {
            code: data?.code ?? "error",
            display_name: data?.display_name ?? "error",
          },
        }}
      >
        {children}
      </ChatTemplate>
    </ChatProvider>
  );
}
