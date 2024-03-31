export type ChatSelfMessageProps = {
  message: string;
  date: Date;
};

export default function ChatSelfMessage({
  message,
  date,
}: ChatSelfMessageProps) {
  return (
    <div className="message me mb-4 flex text-right">
      <div className="flex-1 px-2">
        <div className="inline-block bg-primary rounded-full p-2 px-6 text-white">
          <span>{message}</span>
        </div>
        <div className="pr-4">
          <small className="text-gray-500">{date.toLocaleTimeString()}</small>
        </div>
      </div>
    </div>
  );
}
