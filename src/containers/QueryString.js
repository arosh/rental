// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { setContractAddress, toggleContractAddressDialog } from '../reducer';
import { isAddress } from '../infrastructure/ethereum';

type QueryStringProps = {
  location: any,
  setContractAddress: string => void,
  openContractAddressDialog: () => void,
};

class QueryString extends React.Component<QueryStringProps, {}> {
  componentWillMount() {
    this.dispatchParams(this.props.location.search);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.dispatchParams(nextProps.location.search);
    }
  }
  dispatchParams = (searchString: string) => {
    const params = new URLSearchParams(searchString);
    const addr = params.get('addr');
    if (isAddress(addr)) {
      this.props.setContractAddress(addr);
    } else {
      this.props.openContractAddressDialog();
    }
  };
  render = () => null;
}

export default compose(
  withRouter,
  connect(null, dispatch => ({
    setContractAddress: addr => dispatch(setContractAddress(addr)),
    openContractAddressDialog: () => {
      dispatch(toggleContractAddressDialog(true));
    },
  }))
)(QueryString);
