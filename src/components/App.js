// @flow
import React from 'react';
import AddItemForm from './AddItemForm';
import ItemList from './ItemList';
import RequestList from './RequestList';
import OnLoanList from './OnLoanList';
import HistoryList from './HistoryList';
import Web3Status from './Web3Status';

export const AppComponent = () => (
  <div className="container">
    <h3>Items</h3>
    <AddItemForm />
    <ItemList />
    <h3>Requests</h3>
    <RequestList />
    <h3>On Loan</h3>
    <OnLoanList />
    <h3>History</h3>
    <HistoryList />
    <hr />
    <Web3Status />
  </div>
);

export default AppComponent;
