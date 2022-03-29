import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App/App.js'
import { Provider } from 'react-redux'
import {store} from './App/store'
import './firebase'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>

  , document.getElementById('root'))