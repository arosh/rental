// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  syncNetworkName,
  syncAccountAddress,
  toggleContractAddressDialog,
} from '../reducer';
import type { State } from '../reducer';

const styles = {
  pointer: {
    cursor: 'pointer',
  },
};

type Web3StatusProps = {
  network: string,
  account: string,
  contractAddress: string,
  syncNetworkName: () => void,
  openContractAddressDialog: () => void,
  syncAccountAddress: () => void,
};

export function Web3Status(props: Web3StatusProps) {
  const { web3 } = window;
  return (
    <div>
      <dl className="dl-horizontal">
        <dt>Web3 Status</dt>
        <dd>{web3.isConnected() ? 'Available' : 'Not Available'}</dd>
        <dt>
          Account (<a
            tabIndex={0}
            onClick={props.syncAccountAddress}
            style={styles.pointer}
          >
            Reload
          </a>)
        </dt>
        <dd>{props.account !== '' ? props.account : 'Not Available'}</dd>
        <dt>
          Network (<a
            tabIndex={0}
            onClick={props.syncNetworkName}
            style={styles.pointer}
          >
            Reload
          </a>)
        </dt>
        <dd>{props.network !== '' ? props.network : 'Not Available'}</dd>
        <dt>
          Contract Address (<a
            tabIndex={0}
            onClick={() => props.openContractAddressDialog()}
            style={styles.pointer}
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
    syncNetworkName: () => dispatch(syncNetworkName()),
    openContractAddressDialog: () => {
      dispatch(toggleContractAddressDialog(true));
    },
    syncAccountAddress: () => dispatch(syncAccountAddress()),
  })
)(Web3Status);
