// @flow
import { connect } from 'react-redux';

import OnLoanList from '../components/OnLoanList';
import { confirmReturn } from '../reducer';

import type { State } from '../reducer';

export default connect(
  (state: State) => ({
    requests: state.requests,
    account: state.account,
  }),
  dispatch => ({
    onConfirmReturn: (requestId: number) => dispatch(confirmReturn(requestId)),
  })
)(OnLoanList);
