import Link from "next/link";

export default function NavigationLinks() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 h-full">
      <div className="flex items-center space-x-4 h-full">
        <Link
          href="/examples/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Home
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Chat
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Source code
        </Link>
      </div>
    </div>
  );
}
