// @flow
import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../reducer';

type Props = {
  addItem: (itemName: string, serialNumber: string) => void,
};

type State = {
  name: string,
  serialNumber: string,
};

export class AddItemForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      serialNumber: '',
    };
  }
  handleClick = () => {
    this.props.addItem(this.state.name, this.state.serialNumber);
    this.setState({
      name: '',
      serialNumber: '',
    });
  };
  render = () => (
    <form>
      <div className="form-row">
        <div className="form-group col">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={this.state.name}
            onChange={ev => this.setState({ name: ev.target.value })}
          />
        </div>
        <div className="form-group col">
          <input
            type="text"
            className="form-control"
            placeholder="S/N"
            value={this.state.serialNumber}
            onChange={ev => this.setState({ serialNumber: ev.target.value })}
          />
        </div>
        <div className="form-group col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleClick}
            disabled={this.state.name.length === 0}
          >
            Add item
          </button>
        </div>
      </div>
    </form>
  );
}

export default connect(null, dispatch => ({
  addItem: (itemName: string, serialNumber) =>
    dispatch(addItem(itemName, serialNumber)),
}))(AddItemForm);
