// @flow
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AddItemForm from '../containers/AddItemForm';
import ContractDialog from '../containers/ContractDialog';
import HistoryList from '../containers/HistoryList';
import ItemList from '../containers/ItemList';
import MistBalloon from '../containers/MistBalloon';
import OnLoanList from '../containers/OnLoanList';
import QueryString from '../containers/QueryString';
import RequestList from '../containers/RequestList';

import Web3Status from '../components/Web3Status';

export default () => (
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
