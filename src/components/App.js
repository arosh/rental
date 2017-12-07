// @flow
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AddItemForm from './AddItemForm';
import ItemList from './ItemList';
import RequestList from './RequestList';
import OnLoanList from './OnLoanList';
import HistoryList from './HistoryList';
import Web3Status from './Web3Status';
import MistBalloon from './MistBalloon';
import ContractDialog from './ContractDialog';
import QueryString from './QueryString';

export const AppComponent = () => (
  <Router>
    <div className="container">
      <h3>Items</h3>
      <AddItemForm />
      <ItemList />
      <RequestList />
      <OnLoanList />
      <HistoryList />
      <hr />
      <Web3Status />
      <MistBalloon />
      <ContractDialog />
      <QueryString />
    </div>
  </Router>
);

export default AppComponent;
