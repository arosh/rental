// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { State } from '../reducer';

export function Web3Status(props: { account: string }) {
  const { web3 } = window;
  return (
    <div>
      <dl className="dl-horizontal">
        <dt>Web3 Status</dt>
        <dd>{web3 !== undefined ? 'Available' : 'Not Available'}</dd>
        <dt>Account</dt>
        <dd>{props.account !== '' ? props.account : 'Not Available'}</dd>
      </dl>
    </div>
  );
}

export default connect((state: State) => ({
  account: state.account,
}))(Web3Status);
