import MainTemplate from "@/lib/local/components/templates/MainTemplate";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainTemplate>{children}</MainTemplate>;
}
