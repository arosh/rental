// @flow
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AddItemForm from '../components/AddItemForm';
import ItemList from '../components/ItemList';
import RequestList from '../components/RequestList';
import OnLoanList from '../components/OnLoanList';
import HistoryList from '../components/HistoryList';
import Web3Status from '../components/Web3Status';
import MistBalloon from '../containers/MistBalloon';
import ContractDialog from '../components/ContractDialog';
import QueryString from '../components/QueryString';

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
