// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/App';
import createStore from './createStore';
import { setupWeb3 } from './infra/ethereum';
import {
  syncNetworkName,
  syncAccountAddress,
  syncItems,
  syncRequests,
} from './reducer';

const muiTheme = getMuiTheme();

// Generally, 'DOMContentLoaded' is preferable,
// but in this case 'load' may be preferable
// because MetaMask/Mist must be taken into consideration.
// We welcome your opinion!
window.addEventListener('load', async () => {
  setupWeb3();

  const store = createStore();
  store.dispatch(syncNetworkName());
  store.dispatch(syncAccountAddress());

  setInterval(async () => {
    store.dispatch(syncItems());
    store.dispatch(syncRequests());
  }, 2000);

  const reactRootEl = document.getElementById('react-root');
  if (reactRootEl) {
    ReactDOM.render(
      <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <App />
        </MuiThemeProvider>
      </Provider>,
      reactRootEl
    );
  }
});
