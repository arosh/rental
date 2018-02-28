// @flow
import { connect } from 'react-redux';

import RequestList from '../components/RequestList';
import type { State } from '../reducer';
import { acceptRequest, cancelRequest } from '../reducer';

export default connect(
  (state: State) => ({
    requests: state.requests,
    account: state.account,
  }),
  dispatch => ({
    onAccept: (requestId: number) => dispatch(acceptRequest(requestId)),
    onCancel: (requestId: number) => dispatch(cancelRequest(requestId)),
  })
)(RequestList);
