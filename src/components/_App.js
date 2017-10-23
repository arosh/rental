// @flow
import React from 'react';
import { connect } from 'react-redux';
import { sendMessage, greet } from '../reducers';
import Web3Status from './Web3Status';

type PropTypes = {
  message: string,
  blockNumber: number,
  setMessage: string => void,
  greet: void => void,
};

export class AppComponent extends React.Component<PropTypes, {}> {
  render = () => {
    const { message, blockNumber, setMessage, greet } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
            <Web3Status />
            <dl className="dl-horizontal">
              <dt>blockNumber</dt>
              <dd>{blockNumber}</dd>
              <dt>message</dt>
              <dd>{message}</dd>
            </dl>
            <form>
              <div className="form-group">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="message..."
                    ref="theInput"
                  />
                  <span className="input-group-btn">
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => {
                        setMessage(this.refs.theInput.value);
                        this.refs.theInput.value = '';
                      }}
                    >
                      setMessage
                    </button>
                  </span>
                </div>
              </div>
              {/* <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => greet()}
              >
                greet
              </button> */}
            </form>
          </div>
          <ul />
        </div>
      </div>
    );
  };
}

export default connect(
  state => ({
    message: state.message,
    blockNumber: state.blockNumber,
  }),
  dispatch => ({
    setMessage: (value: string) => dispatch(sendMessage(value)),
    greet: () => greet(),
  })
)(AppComponent);
