import ChatNewPage from "@/lib/local/components/pages/ChatNewPage";

export default async function ChatNew({
  params: { user },
}: {
  params: { user: string };
}) {
  return <ChatNewPage user={user} />;
}
