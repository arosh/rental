// @flow
import React from 'react';
import { connect } from 'react-redux';
import { updateMessage } from '../reducers';

type PropTypes = {
  message: string,
  updateMessage: string => void,
};

export function AppComponent(props: PropTypes) {
  const { message, updateMessage } = props;
  return (
    <div>
      <p>message: {message}</p>
      {message === 'hello, world' ? (
        <button onClick={() => updateMessage('goodbye, world')}>goodbye</button>
      ) : (
        <button onClick={() => updateMessage('hello, world')}>hello</button>
      )}
    </div>
  );
}

export default connect(
  state => ({
    message: state.message,
  }),
  dispatch => ({
    updateMessage: (message: string) => dispatch(updateMessage(message)),
  })
)(AppComponent);
