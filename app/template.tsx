"use client";

import ApolloProvider from "@/lib/apollo/ApolloProvider";
import { AuthUserProvider } from "@/lib/local/providers/AuthUserProvider";

export default function Template({ children }: React.PropsWithChildren) {
  return (
    <AuthUserProvider>
      <ApolloProvider>{children}</ApolloProvider>
    </AuthUserProvider>
  );
}
