import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory'

const isProduction = process.env.NODE_ENV === 'production'

const errorLink = onError(({ graphQLErrors, networkError }) => {
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
  uri: isProduction
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:4000/graphql',
})

const cache = new InMemoryCache()

const link = ApolloLink.from([errorLink, httpLink])

export const client = new ApolloClient({
  cache,
  link,
})
