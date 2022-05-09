import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { App } from './App/App.js';
import { Provider } from 'react-redux';
import { store } from './App/store';
import './firebase';

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,

  document.getElementById('root'),
);
