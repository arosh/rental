// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { toggleContractAddressDialog } from '../reducer';
import { isAddress } from '../infrastructure/ethereum';
import type { State } from '../reducer';

type InputProps = {
  contractAddress: string,
  onChange: (contractAddress: string) => void,
};

class Input extends React.Component<InputProps, {}> {
  componentDidMount() {
    this.refs.theInput.focus();
  }
  render = () => (
    <TextField
      hintText="0x0123456789abcdef0123456789abcdef01234567"
      fullWidth={true}
      value={this.props.contractAddress}
      ref="theInput"
      onChange={e => this.props.onChange(e.target.value)}
    />
  );
}

type ContractDialogProps = {
  open: boolean,
  onSubmit: (contractAddress: string) => void,
  closeDialog: () => void,
};

type ContractDialogState = {
  contractAddress: string,
};

class ContractDialog extends React.Component<
  ContractDialogProps,
  ContractDialogState
> {
  state = {
    contractAddress: '',
  };

  onClick = () => {
    this.props.onSubmit(this.state.contractAddress);
    this.setState({
      contractAddress: '',
    });
  };

  render = () => {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.closeDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.onClick}
        disabled={!isAddress(this.state.contractAddress)}
      />,
    ];

    return (
      <Dialog
        title="Enter the contract address"
        actions={actions}
        modal={true}
        open={this.props.open}
      >
        <Input
          contractAddress={this.state.contractAddress}
          onChange={contractAddress => this.setState({ contractAddress })}
        />
      </Dialog>
    );
  };
}

export default compose(
  withRouter,
  connect(
    (state: State) => ({
      open: state.contractAddressDialogOpen,
    }),
    (dispatch, ownProps) => ({
      onSubmit: (contractAddress: string) => {
        const { location, history } = ownProps;
        const params = new URLSearchParams(location.search);
        params.set('addr', contractAddress);
        history.push({
          search: params.toString(),
        });
        dispatch(toggleContractAddressDialog(false));
      },
      closeDialog: () => {
        dispatch(toggleContractAddressDialog(false));
      },
    })
  )
)(ContractDialog);
