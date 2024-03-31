import { useContext } from "react";
import { ChatContext } from "../contexts/ChatContext";

export default function useChat() {
  const { ...values } = useContext(ChatContext);
  return { ...values };
}
