import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/lib/local/components/molecules/Toaster";

const defaultUrl = process.env.NEXT_PUBLIC_URL
  ? `https://${process.env.NEXT_PUBLIC_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Whispera - Chat",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body
        className={cn(
          "bg-background font-sans antialiased bg-background text-foreground",
          GeistSans.style
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
