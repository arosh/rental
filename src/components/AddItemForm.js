// @flow
import React from 'react';
import { connect } from 'react-redux';
import { addItem } from '../reducers';

type Props = {
  addItem: (itemName: string) => void,
};

type State = {
  theInput: string,
};

export class AddItemForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      theInput: '',
    };
  }
  handleChange = (input: any) => {
    this.setState({
      theInput: input.target.value,
    });
  };
  handleClick = () => {
    this.props.addItem(this.state.theInput);
    this.setState({
      theInput: '',
    });
  };
  render = () => (
    <form>
      <div className="form-row">
        <div className="form-group col">
          <input
            type="text"
            className="form-control"
            placeholder="Enter item name"
            value={this.state.theInput}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group col">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleClick}
            disabled={this.state.theInput.length === 0}
          >
            Add item
          </button>
        </div>
      </div>
    </form>
  );
}

export default connect(null, dispatch => ({
  addItem: (itemName: string) => dispatch(addItem(itemName)),
}))(AddItemForm);
