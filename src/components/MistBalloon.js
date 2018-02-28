// @flow
import React from 'react';
import './MistBalloon.css';

type Props = {
  display: boolean,
};

export default (props: Props) =>
  props.display && (
    <div className="mist-balloon">Click here to add an account on Mist</div>
  );
