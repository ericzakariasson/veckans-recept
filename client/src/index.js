import React from 'react'
import ReactDOM from 'react-dom'
import dotenv from 'dotenv'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'

import { client } from './apollo'
import { theme } from './style'
import * as serviceWorker from './serviceWorker'

import App from './App'

import 'normalize.css'
import './index.css'

dotenv.config()

const Root = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
