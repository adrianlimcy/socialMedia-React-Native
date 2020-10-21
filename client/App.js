import React from 'react';
import { AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import AppContainer from './AppContainer';
import {GET_NOTIFICATIONS, ADD_NOTIFICATIONS} from './constants'
import {Notifications} from 'expo'
import { NotificationTimeoutError } from 'expo-notifications';

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
  resolvers: {
    Mutations: {
      addNotification: async (_, { id, title, body }) => {
        const {data} = await client.query({ query: GET_NOTIFICATIONS })

        cache.writeData({
          data: {
            notifications: [
              ...data.notifications,
              {id, title, body, _typename: 'notifications' }
            ]
          }
        })
      }
    }
  },
  typeDefs:`
  type Notification {
    id: Number!
    title: String!
    body: String!
  }
  extend type Query {
    notifications: [Notification]!
  }
  `
});

cache.writeData({
  data: {
    notifications: []
  }
})

const App = () => {
  React.useEffect(()=> {
    Notifications.addListener(handleNotification)
  })

  const handleNotification = ({data}) => {
    client.mutate({
      mutation: ADD_NOTIFICATIONS,
      variables: {
        id: Math.floor(Math.random() *500) +1,
        title: data.title,
        body: data.body
      }
    })
  }

  return (
    <ApolloProvider client={client}>
      <ActionSheetProvider>
        <AppContainer />
      </ActionSheetProvider>
    </ApolloProvider>
  )
}

export default App;
