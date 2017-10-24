// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import createStore from './createStore';
import * as eth from './infra/ethereum';
import { updateItems } from './reducer';

window.addEventListener('load', async function() {
  await eth.setupWeb3();

  const store = createStore();
  setInterval(async () => {
    store.dispatch(updateItems());
  }, 1000);

  const reactRootEl = document.getElementById('react-root');
  if (reactRootEl) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      reactRootEl
    );
  }
});
