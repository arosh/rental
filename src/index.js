// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import createStore from './store/create';
import * as web3utils from './web3utils';

const store = createStore();

window.addEventListener('load', function() {
  web3utils.setupWeb3();

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react-root')
  );
});
