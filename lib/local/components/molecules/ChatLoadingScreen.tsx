import LoadingSpinner from "../atoms/LoadingSpinner";

export default function ChatLoadingScreen() {
  return (
    <div className="flex w-[100vw] h-[100vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3 animate-pulse">
        <LoadingSpinner className="w-16 h-16" />
        <p className="text-lg">Connecting to server...</p>
      </div>
    </div>
  );
}
