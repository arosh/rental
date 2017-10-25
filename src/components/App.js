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

const HistoryItemCard = () => (
  <div className="col-lg-4 col-md-6 col-xs-12 pb-3">
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Card title</h4>
        <dl className="row">
          <dt className="col-4">Owner</dt>
          <dd className="col-8">0x3DBf4EC5DcB45E33244ac36E83d8Cf50b8898968</dd>
          <dt className="col-4">Client</dt>
          <dd className="col-8">0x7Df778b37710b67548D939680605f0E68F3943e5</dd>
          <dt className="col-4">Fee</dt>
          <dd className="col-8">0.01 ether</dd>
          <dt className="col-4">Start</dt>
          <dd className="col-8">2017/10/22</dd>
          <dt className="col-4">End</dt>
          <dd className="col-8">2017/10/23</dd>
        </dl>
        <button type="button" className="btn btn-outline-success">
          Accept Returning
        </button>
      </div>
    </div>
  </div>
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
