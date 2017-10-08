// @flow
import React from 'react';
import { connect } from 'react-redux';
import { updateGreeting, updateBlockNumber } from '../reducers';

type PropTypes = {
  greeting: string,
  blockNumber: number,
  setGreeting: string => void,
  increment: number => void,
};

export class AppComponent extends React.Component<PropTypes, {}> {
  render = () => {
    const { greeting, blockNumber, setGreeting, increment } = this.props;
    return (
      <div>
        <p>greet() = {greeting}</p>
        <p>getBlockNumber() = {blockNumber}</p>
        <input ref="theInput" />
        <button onClick={() => setGreeting(this.refs.theInput.value)}>
          setGreeting
        </button>
        <button onClick={() => increment(blockNumber + 1)}>+</button>
      </div>
    );
  };
}

export default connect(
  state => ({
    greeting: state.greeting,
    blockNumber: state.blockNumber,
  }),
  dispatch => ({
    setGreeting: (value: string) => dispatch(updateGreeting(value)),
    increment: (value: number) => dispatch(updateBlockNumber(value)),
  })
)(AppComponent);
