// @flow
import { connect } from 'react-redux';

import OnLoanList from '../components/OnLoanList';
import type { State } from '../reducer';
import { confirmReturn } from '../reducer';

export default connect(
  (state: State) => ({
    requests: state.requests,
    account: state.account,
  }),
  dispatch => ({
    onConfirmReturn: (requestId: number) => dispatch(confirmReturn(requestId)),
  })
)(OnLoanList);
