import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { routes } from "./routes";
import "./style.css";
import Theme from "./theme";

const client = new ApolloClient({
  uri:
    window.location.protocol +
    "//" +
    window.location.hostname +
    `:${import.meta.env.VITE_CORE_PORT ?? 8000}/graphql`,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  }
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <ThemeProvider theme={Theme}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </ThemeProvider>
    </React.StrictMode>
  </ApolloProvider>,
);
