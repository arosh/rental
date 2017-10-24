// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import createStore from './store/create';
import * as eth from './infra/ethereum';
import * as deepEqual from 'deep-equal';
import { updateItems } from './reducers';

window.addEventListener('load', async function() {
  await eth.setupWeb3();

  const store = createStore();
  setInterval(async () => {
    const items = await eth.getItems();
    if (!deepEqual(items, store.getState().items)) {
      store.dispatch(updateItems(items));
    }
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
