// @flow
import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { isAddress } from '../infrastructure/ethereum';

type InputProps = {
  contractAddress: string,
  onChange: (contractAddress: string) => void,
};

class Input extends React.Component<InputProps, {}> {
  inputRef: ?HTMLInputElement;
  componentDidMount() {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }
  render = () => (
    <TextField
      hintText="0x0123456789abcdef0123456789abcdef01234567"
      fullWidth={true}
      value={this.props.contractAddress}
      ref={elem => {
        this.inputRef = elem;
      }}
      onChange={e => this.props.onChange(e.target.value)}
    />
  );
}

type ContractDialogProps = {
  open: boolean,
  onSubmit: (contractAddress: string) => void,
  onCancel: () => void,
};

type ContractDialogState = {
  contractAddress: string,
};

export default class ContractDialog extends React.Component<
  ContractDialogProps,
  ContractDialogState
> {
  state = {
    contractAddress: '',
  };

  handleSubmit = () => {
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
        onClick={this.props.onCancel}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
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
