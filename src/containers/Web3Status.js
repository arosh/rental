// @flow
import { connect } from 'react-redux';

import Web3Status from '../components/Web3Status';
import type { State } from '../reducer';
import {
  syncNetworkName,
  syncAccountAddress,
  toggleContractAddressDialog,
} from '../reducer';

export default connect(
  (state: State) => {
    const { web3 } = window;
    return {
      isConnected: web3.isConnected(),
      network: state.network,
      contractAddress: state.contractAddress,
      account: state.account,
    };
  },
  dispatch => ({
    syncNetworkName: () => dispatch(syncNetworkName()),
    openContractAddressDialog: () => {
      dispatch(toggleContractAddressDialog(true));
    },
    syncAccountAddress: () => dispatch(syncAccountAddress()),
  })
)(Web3Status);
