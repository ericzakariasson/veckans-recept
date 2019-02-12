import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { client } from './apollo'
import { theme } from './style'

import Admin from './admin'
import Generator from './components/Generator'
import Week from './components/Week'

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {/* <Route path="/admin" component={Admin} /> */}
          <Route path="/vecka/:id" component={Week} />
          <Route path="/" component={Generator} />
        </Switch>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
)

export default App
