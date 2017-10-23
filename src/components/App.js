// @flow
import React from 'react';

const ItemCard = () => (
  <div className="col-lg-4 col-md-6 col-xs-12 pb-3">
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">Card title</h4>
        <h6 className="card-subtitle mb-2 text-muted">
          Owner: 0x3DBf4EC5DcB45E33244ac36E83d8Cf50b8898968
        </h6>
        <form>
          <div className="form-row">
            <div className="form-group col-6">
              <input type="number" className="form-control" placeholder="fee" />
            </div>
            <div className="form-group col-auto">
              <select className="form-control custom-select" defaultValue="eth">
                <option value="eth">eth</option>
                <option value="gwei">gwei</option>
                <option value="wei">wei</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-form-label col-3">Start</label>
            <div className="col-9">
              <input type="date" className="form-control" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-form-label col-3">End</label>
            <div className="col-9">
              <input type="date" className="form-control" />
            </div>
          </div>
          <button type="button" className="btn btn-outline-primary">
            Send request
          </button>
        </form>
      </div>
    </div>
  </div>
);

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

// https://stackoverflow.com/a/32112741
// <button type="button" className="btn btn-outline-secondary" title="You're not an owner." style={{pointerEvents: 'auto'}} disabled>
//   Accept
// </button>

const RequestCard = () => (
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
          Accept
        </button>
        <button type="button" className="btn btn-outline-warning ml-2">
          Cancel
        </button>
      </div>
    </div>
  </div>
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

const AddItemForm = () => (
  <form>
    <div className="form-row">
      <div className="form-group col">
        <input
          type="text"
          className="form-control"
          placeholder="Enter item name"
        />
      </div>
      <div className="form-group col">
        <button type="button" className="btn btn-primary">
          Add item
        </button>
      </div>
    </div>
  </form>
);

export const AppComponent = () => (
  <div className="container">
    <h3>Items</h3>
    <AddItemForm />
    <div className="row">
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
      <ItemCard />
    </div>
    <h3>Requests</h3>
    <div className="row">
      <RequestCard />
      <RequestCard />
      <RequestCard />
      <RequestCard />
    </div>
    <h3>History</h3>
    <div className="row">
      <HistoryItemCard />
      <HistoryItemCard />
      <HistoryItemCard />
      <HistoryItemCard />
    </div>
    <hr />
    <NetworkCard />
  </div>
);

export default AppComponent;
