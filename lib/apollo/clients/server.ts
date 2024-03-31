import { supabaseServer } from "@/lib/supabase/server";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API!,
});

const authLink = setContext(async (_, { headers }) => {
  const token = (await supabaseServer(false).auth.getSession()).data.session
    ?.access_token;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const apolloServerClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({}),
});

export default apolloServerClient;
