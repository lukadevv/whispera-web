import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar";

export type ChatOtherMessageProps = {
  avatar?: string;
  display_name: string;
  message: string;
  date: Date;
};

export default function ChatOtherMessage({
  message,
  date,
  avatar,
  display_name,
}: ChatOtherMessageProps) {
  return (
    <div className="message mb-4 flex">
      <div className="flex-2">
        <Avatar className="border-solid border-2 w-12 h-12">
          <AvatarImage src={avatar} alt={"user avatar"} />
          <AvatarFallback>{display_name[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 px-2">
        <div className="inline-block bg-gray-200 rounded-full p-2 px-6 text-gray-700">
          <span>{message}</span>
        </div>
        <div className="pl-4">
          <small className="text-gray-500">{date.toLocaleTimeString()}</small>
        </div>
      </div>
    </div>
  );
}
