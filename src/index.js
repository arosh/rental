// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import createStore from './store/create';
// import * as eth from './infra/ethereum';
// import { updateBlockNumber, updateMessage } from './reducers';

const store = createStore();

window.addEventListener('load', function() {
  // eth.setupWeb3();

  // eth.setOnGreet(() => {});
  // setInterval(async () => {
  //   const blockNumber = await eth.getBlockNumber();
  //   if (store.getState().blockNumber !== blockNumber) {
  //     store.dispatch(updateBlockNumber(blockNumber));
  //   }
  //   const message = await eth.getMessage();
  //   if (store.getState().message !== message) {
  //     store.dispatch(updateMessage(message));
  //   }
  // }, 100);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react-root')
  );
});
