// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { setContractAddress } from '../reducer';

type QueryStringProps = {
  location: any,
  setContractAddress: string => void,
};

class QueryString extends React.Component<QueryStringProps, {}> {
  dispatchParams = (searchString: string) => {
    const params = new URLSearchParams(searchString);
    const addr = params.get('addr');
    this.props.setContractAddress(addr);
  };
  componentWillMount() {
    this.dispatchParams(this.props.location.search);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.dispatchParams(nextProps.location.search);
    }
  }
  render = () => null;
}

export default compose(
  withRouter,
  connect(null, dispatch => ({
    setContractAddress: addr => dispatch(setContractAddress(addr)),
  }))
)(QueryString);
