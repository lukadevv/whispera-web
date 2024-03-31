"use client";

import useChat from "../../hooks/useChat";
import SearchInput from "../atoms/SearchInput";
import { Card, CardContent, CardHeader } from "../molecules/Card";
import ContactItem from "../molecules/ContactItem";

type ContactListProps = {
  card?: {
    className: Parameters<typeof Card>[0]["className"];
  };
  content?: {
    className: Parameters<typeof CardContent>[0]["className"];
  };
};

export default function ContactList({ card, content }: ContactListProps) {
  const { contacts } = useChat();

  return (
    <Card className={`pr-6 m-0 p-0 bg-slate-800 ${card?.className ?? ""}`}>
      <CardHeader className="search flex-2 p-0 m-0 pb-1 px-4">
        <SearchInput placeholder="Search for contacts" />
      </CardHeader>
      <CardContent
        className={`flex-1 mb-0 mt-1 py-0 px-4 overflow-x-hidden overflow-y-auto h-[92%] ${
          content?.className ?? ""
        }`}
      >
        {contacts.map((each) => (
          <ContactItem
            key={each.id}
            id={each.id}
            requestId={each.requestId}
            userId={each.userId}
            display_name={each.display_name}
            online={each.online}
            code={each.code}
          />
        ))}
      </CardContent>
    </Card>
  );
}
