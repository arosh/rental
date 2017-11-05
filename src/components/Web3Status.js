// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  updateNetwork,
  updateAccount,
  toggleContractAddressDialog,
} from '../reducer';
import type { State } from '../reducer';

type Web3StatusProps = {
  network: string,
  account: string,
  contractAddress: string,
  updateNetwork: () => void,
  updateContractAddress: () => void,
  updateAccount: () => void,
};

export function Web3Status(props: Web3StatusProps) {
  const { web3 } = window;
  return (
    <div>
      <dl className="dl-horizontal">
        <dt>Web3 Status</dt>
        <dd>{web3.isConnected() ? 'Available' : 'Not Available'}</dd>
        <dt>
          Account (<a tabIndex={0} onClick={props.updateAccount}>
            Reload
          </a>)
        </dt>
        <dd>{props.account !== '' ? props.account : 'Not Available'}</dd>
        <dt>
          Network (<a tabIndex={0} onClick={props.updateNetwork}>
            Reload
          </a>)
        </dt>
        <dd>{props.network !== '' ? props.network : 'Not Available'}</dd>
        <dt>
          Contract Address (<a
            tabIndex={0}
            onClick={() => props.updateContractAddress()}
          >
            Change
          </a>)
        </dt>
        <dd>
          {props.contractAddress !== ''
            ? props.contractAddress
            : 'Not Available'}
        </dd>
      </dl>
    </div>
  );
}

export default connect(
  (state: State) => ({
    network: state.network,
    contractAddress: state.contractAddress,
    account: state.account,
  }),
  dispatch => ({
    updateNetwork: () => dispatch(updateNetwork()),
    updateContractAddress: () => {
      dispatch(toggleContractAddressDialog(true));
    },
    updateAccount: () => dispatch(updateAccount()),
  })
)(Web3Status);
