// @flow
import { connect } from 'react-redux';
import type { State } from '../reducer';
import MistBalloon from '../components/MistBalloon';

export default connect((state: State) => ({
  display: state.account === '' && typeof window.mist !== 'undefined',
}))(MistBalloon);
