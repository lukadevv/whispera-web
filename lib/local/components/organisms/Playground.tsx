import Chat from "./Chat";

export default function Playground() {
  return (
    <>
      <Chat
        contact={{
          avatar: "/logo.png",
          display_name: "Bot Whispera",
          online: false,
          userId: "idk",
        }}
        id="adwdw"
        messages={[
          {
            type: "self",
            message: "Hello",
            date: new Date(),
          },
          {
            type: "self",
            message: "How are you?",
            date: new Date(),
          },
        ]}
      />
    </>
  );
}
