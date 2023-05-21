<<<<<<< HEAD
import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { routes } from './routes';
import Theme from './theme';

const client = new ApolloClient({
  uri: 'http://0.0.0.0:8000/graphql',
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <ThemeProvider theme={Theme}>
        <RouterProvider router={createBrowserRouter(routes)} />
      </ThemeProvider>
    </React.StrictMode>
  </ApolloProvider>
);
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
>>>>>>> 09b699b (:tada: Initial commit)
