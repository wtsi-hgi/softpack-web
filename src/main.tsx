import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { routes } from "./routes";
import "./style.css";
import Theme from "./theme";
import CoreURL from './core';

const client = new ApolloClient({
  uri: CoreURL+"graphql",
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
