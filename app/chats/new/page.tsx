import { redirect } from "next/navigation";

export default async function Redirect() {
  redirect("/chats");
}
