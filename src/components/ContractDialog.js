// @flow
import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { updateContractAddress, toggleContractAddressDialog } from '../reducer';
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
      hintText="Enter the contract address."
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
  handleClose: () => void,
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
        onClick={this.props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.onClick}
        disabled={this.state.contractAddress.length === 0}
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

export default connect(
  (state: State) => ({
    open: state.contractAddressDialogOpen,
  }),
  dispatch => ({
    onSubmit: (contractAddress: string) => {
      dispatch(updateContractAddress(contractAddress));
      dispatch(toggleContractAddressDialog(false));
    },
    handleClose: () => {
      dispatch(toggleContractAddressDialog(false));
    },
  })
)(ContractDialog);
