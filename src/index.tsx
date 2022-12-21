import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { App } from '@/App/App';
import { Provider } from 'react-redux';
import { store } from '@/App/Redux/store/';
import '@/firebase';

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,

  document.getElementById('root'),
);
