import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { client } from './apollo'
import { theme } from './style'

import Dashboard from './admin/Dashboard'
import Ingredients from './admin/Ingredients'
import Units from './admin/Units'
import Generator from './components/Generator'

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/admin/ingredienser" component={Ingredients} />
          <Route path="/admin/enheter" component={Units} />
          <Route path="/admin" component={Dashboard} />
          <Route path="/" component={Generator} />
        </Switch>
      </Router>
    </ThemeProvider>
  </ApolloProvider>
)

export default App
