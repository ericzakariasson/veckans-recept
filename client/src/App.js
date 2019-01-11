import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'

import { client } from './apollo'
import { theme } from './style'

import Header from './components/Header'
import Week from './components/Week'

const Wrapper = styled.div`
  padding: 40px;
`
const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Header />
        <Week />
      </Wrapper>
    </ThemeProvider>
  </ApolloProvider>
)

export default App
