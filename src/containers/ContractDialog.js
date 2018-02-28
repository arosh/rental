// @flow
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

import type { State } from '../reducer';
import { toggleContractAddressDialog } from '../reducer';
import ContractDialog from '../components/ContractDialog';

export default compose(
  withRouter,
  connect(
    (state: State) => ({
      open: state.contractAddressDialogOpen,
    }),
    (dispatch, ownProps) => ({
      onSubmit: (contractAddress: string) => {
        const { location, history } = ownProps;
        const params = new URLSearchParams(location.search);
        params.set('addr', contractAddress);
        history.push({
          search: params.toString(),
        });
        dispatch(toggleContractAddressDialog(false));
      },
      closeDialog: () => {
        dispatch(toggleContractAddressDialog(false));
      },
    })
  )
)(ContractDialog);
