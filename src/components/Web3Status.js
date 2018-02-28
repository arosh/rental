// @flow
import React from 'react';

const styles = {
  pointer: {
    cursor: 'pointer',
  },
};

type Web3StatusProps = {
  isConnected: boolean,
  network: string,
  account: string,
  contractAddress: string,
  syncNetworkName: () => void,
  openContractAddressDialog: () => void,
  syncAccountAddress: () => void,
};

export default (props: Web3StatusProps) => (
  <div>
    <dl className="dl-horizontal">
      <dt>Web3 Status</dt>
      <dd>{props.isConnected ? 'Available' : 'Not Available'}</dd>
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
        {props.contractAddress !== '' ? props.contractAddress : 'Not Available'}
      </dd>
    </dl>
  </div>
);
