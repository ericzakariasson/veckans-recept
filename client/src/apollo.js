import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = new createHttpLink({
  uri: process.env.REACT_APP_API_URL,
})

const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache,
  link: httpLink,
})
