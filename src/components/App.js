// @flow
import React from 'react';
import AddItemForm from './AddItemForm';
import ItemList from './ItemList';
import RequestList from './RequestList';
import OnLoanList from './OnLoanList';
import RequestHistory from './RequestHistory';
import Web3Status from './Web3Status';

const NetworkCard = () => (
  <form>
    <div className="form-group">
      <select className="form-control">
        <option>Main Ethereum Network</option>
        <option>Ropsten Test Network</option>
        <option>Kovan Test Network</option>
        <option>Rinkeby Test Network</option>
        <option>Localhost 8545</option>
      </select>
    </div>
  </form>
);

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
    <RequestHistory />
    <hr />
    <Web3Status />
    <NetworkCard />
  </div>
);

export default AppComponent;
