import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AlertProvider } from 'react-alert-with-buttons';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Cookies from "js-cookie"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${Cookies.get('jwt_token')}`
  }
})

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AlertProvider>
        <App />
      </AlertProvider>
    </ApolloProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
