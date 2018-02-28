// @flow
import { connect } from 'react-redux';

import ItemList from '../components/ItemList';
import type { SendRequestArgs } from '../types';
import { sendRequest } from '../reducer';
import type { State } from '../reducer';

export default connect(
  (state: State) => ({
    items: state.items,
    account: state.account,
  }),
  dispatch => ({
    sendRequest: (args: SendRequestArgs) => dispatch(sendRequest(args)),
  })
)(ItemList);
