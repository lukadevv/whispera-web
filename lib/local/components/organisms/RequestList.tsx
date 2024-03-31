"use client";

import useAuth from "../../hooks/useAuth";
import useChat from "../../hooks/useChat";
import SearchInput from "../atoms/SearchInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "../molecules/Card";
import RequestItem from "../molecules/RequestItem";

type RequestListProps = {
  card?: {
    className: Parameters<typeof Card>[0]["className"];
  };
  content?: {
    className: Parameters<typeof CardContent>[0]["className"];
  };
};

export default function RequestList({ card, content }: RequestListProps) {
  const { contactRequests } = useChat();
  const { user } = useAuth();

  return (
    <Card className={`pr-6 m-0 p-0 bg-slate-800 ${card?.className ?? ""}`}>
      <CardHeader className="search flex-2 p-0 m-0 pb-1 px-4">
        <SearchInput placeholder="Search for requests" />
      </CardHeader>
      <CardContent
        className={`flex-1 mb-0 mt-1 py-0 px-4 overflow-x-hidden overflow-y-auto h-[92%] ${
          content?.className ?? ""
        }`}
      >
        {contactRequests.map((each) => (
          <RequestItem
            key={each.id}
            request={{
              id: each.id,
              type: each.from.id === user?.id ? "outgoing" : "incoming",
            }}
            targetUser={each.targetUser}
          />
        ))}
      </CardContent>
    </Card>
  );
}
