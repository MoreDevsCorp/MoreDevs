import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import store from "./store.ts";

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
