// @flow
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AddItemForm from '../containers/AddItemForm';
import ContractDialog from '../containers/ContractDialog';
import MistBalloon from '../containers/MistBalloon';

import HistoryList from '../components/HistoryList';
import ItemList from '../components/ItemList';
import OnLoanList from '../components/OnLoanList';
import QueryString from '../components/QueryString';
import RequestList from '../components/RequestList';
import Web3Status from '../components/Web3Status';

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
