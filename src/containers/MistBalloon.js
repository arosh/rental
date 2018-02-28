// @flow
import { connect } from 'react-redux';

import MistBalloon from '../components/MistBalloon';
import type { State } from '../reducer';

export default connect((state: State) => ({
  display: state.account === '' && typeof window.mist !== 'undefined',
}))(MistBalloon);
