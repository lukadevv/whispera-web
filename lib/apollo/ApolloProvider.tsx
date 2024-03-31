import { ApolloProvider as NativeApolloProvider } from "@apollo/client";
import apolloClient from "./clients/client";

export default function ApolloProvider({ children }: React.PropsWithChildren) {
  return (
    <NativeApolloProvider client={apolloClient}>
      {children}
    </NativeApolloProvider>
  );
}
