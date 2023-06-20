import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
  fetchOptions: {
    mode: "no-cors",
  },
});

const user = localStorage.getItem("MOREDEVS_USER") || "";

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authoriziation: `Bearer ${JSON.parse(user).token}`,
    },
  };
});

// Checking for the exisiting of the window object, thus we're in the client not in the server !
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql/subscriptions",
    connectionParams: async () => {
      return {
        session: {
          user: { ...JSON.parse(user) },
        },
      };
    },
  })
);

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});
