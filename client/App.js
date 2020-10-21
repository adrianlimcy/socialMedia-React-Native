import React from 'react';
import { AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import AppContainer from './AppContainer';

const API_URL = 'http://172.19.140.40:4000/graphql';

const httpLink = new HttpLink({
  uri: API_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

const App = () => (
  <ApolloProvider client={client}>
    <ActionSheetProvider>
      <AppContainer />
    </ActionSheetProvider>
  </ApolloProvider>
);

export default App;
