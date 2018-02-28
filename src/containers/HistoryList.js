// @flow
import { connect } from 'react-redux';

import HistoryList from '../components/HistoryList';
import type { State } from '../reducer';

export default connect((state: State) => ({
  requests: state.requests,
}))(HistoryList);
