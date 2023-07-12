import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  ApolloLink,
  concat,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const user = localStorage.getItem("MOREDEVS_USER") || "";

const httpLink = new HttpLink({
  uri: process.env.VITE_GRAPHQL_BACKEND_URL,
  credentials: "omit",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: `Bearer ${JSON.parse(user).token}` || null,
    },
  }));

  return forward(operation);
});

// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       authoriziation: `Bearer ${JSON.parse(user).token}`,
//     },
//   };
// });

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

// export const client = new ApolloClient({

//   link: authLink.concat(link),
//   credentials: "include",
//   cache: new InMemoryCache(),
// });
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, link),
});

export default client;
// export const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: new HttpLink({
//     uri: "http://localhost:4000/graphql",
//     fetchOptions: {
//       mode: "no-cors", // no-cors, *cors, same-origin
//     },
//     headers: {
//       authoriziation: `Bearer ${JSON.parse(user).token}`,
//     },
//   }),
// });
