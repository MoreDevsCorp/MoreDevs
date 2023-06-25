import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.ts";
import { Toaster } from "react-hot-toast";

import { ApolloProvider } from "@apollo/client";

import client from "./graphql/apollo-client.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Toaster />
      <App />
    </ApolloProvider>
  </Provider>
);
