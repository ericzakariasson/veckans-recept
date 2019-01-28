import { ApolloClient, NetworkStatus } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

const httpLink = new createHttpLink({
  uri: process.env.REACT_APP_API_URL,
})

const cache = new InMemoryCache()

const link = ApolloLink.from([errorLink, httpLink])

export const client = new ApolloClient({
  cache,
  link,
})
