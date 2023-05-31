import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ApolloProvider } from "@apollo/client";

import { client } from "./graphql/apollo-client.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
