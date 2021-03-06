import React from 'react'
import ReactDOM from 'react-dom'
import dotenv from 'dotenv'

import * as serviceWorker from './serviceWorker'

import App from './App'

import 'normalize.css'
import './index.css'

dotenv.config()

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
