// @flow
import React from 'react';
import type { Item, SendRequestArgs } from '../types';

type ItemCardProp = {
  item: Item,
  sendRequest: SendRequestArgs => void,
  account: string,
};

export class ItemCard extends React.Component<ItemCardProp, {}> {
  handleClick = () => {
    const theFee = this.refs.theFee.value;
    const theUnit = this.refs.theUnit.value;
    const theStart = this.refs.theStart.value;
    const theEnd = this.refs.theEnd.value;
    if (this.props.account === this.props.item.owner) {
      alert('This is your item.');
      return;
    }
    if (theFee === '') {
      alert('Enter the fee field.');
      return;
    }
    if (['ether', 'gwei', 'wei'].includes(theUnit) === false) {
      alert('Enter the unit field.');
      return;
    }
    if (theStart === '') {
      alert('Enter the start date field.');
      return;
    }
    if (theEnd === '') {
      alert('Enter the end date field.');
      return;
    }
    this.props.sendRequest({
      itemId: this.props.item.itemId,
      fee: theFee,
      unit: theUnit,
      start: theStart,
      end: theEnd,
    });
  };
  render = () => {
    const { item } = this.props;
    return (
      <div className="col-lg-4 col-md-6 col-xs-12 pb-3">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">{item.name}</h4>
            <dl>
              <dt>Owner</dt>
              <dd>{item.owner}</dd>
              <dt>S/N</dt>
              <dd>{item.serialNumber}</dd>
            </dl>
            <form>
              <div className="form-row">
                <div className="form-group col-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="fee"
                    ref="theFee"
                  />
                </div>
                <div className="form-group col-auto">
                  <select
                    className="form-control custom-select"
                    defaultValue="eth"
                    ref="theUnit"
                  >
                    <option value="ether">ether</option>
                    <option value="gwei">gwei</option>
                    <option value="wei">wei</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label col-3">Start</label>
                <div className="col-9">
                  <input type="date" className="form-control" ref="theStart" />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-form-label col-3">End</label>
                <div className="col-9">
                  <input type="date" className="form-control" ref="theEnd" />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.handleClick}
              >
                Send request
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

export default ItemCard;
