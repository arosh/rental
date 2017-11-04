// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { State } from '../reducer';
import './MistBalloon.css';

type Props = {
  display: boolean,
};

const MistBalloonComponent = (props: Props) => (
  <div
    className="mist-balloon"
    style={{ display: props.display ? 'block' : 'none' }}
  >
    Click here to add an account on Mist
  </div>
);

export default connect((state: State) => ({
  display: state.account === '' && typeof window.mist !== 'undefined',
}))(MistBalloonComponent);
