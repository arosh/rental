// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import createStore from './store/create';
import * as eth from './infra/ethereum';
import * as equal from 'deep-equal';
import { updateItems } from './reducers';

const store = createStore();

window.addEventListener('load', async function() {
  await eth.setupWeb3();

  setInterval(async () => {
    const items = await eth.getItems();
    if (!equal(items, store.getState().items)) {
      store.dispatch(updateItems(items));
    }
  }, 1000);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react-root')
  );
});
