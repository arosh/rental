// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import createStore from './createStore';
import { setupWeb3 } from './infra/ethereum';
import {
  updateNetwork,
  updateAccount,
  updateItems,
  updateRequests,
} from './reducer';

// Generally, 'DOMContentLoaded' is preferable,
// but in this case 'load' may be preferable
// because MetaMask/Mist must be taken into consideration.
// We welcome your opinion!
window.addEventListener('load', async () => {
  setupWeb3();

  const store = createStore();
  store.dispatch(updateNetwork());
  store.dispatch(updateAccount());

  setInterval(async () => {
    store.dispatch(updateItems());
    store.dispatch(updateRequests());
  }, 3000);

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
