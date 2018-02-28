// @flow
import { connect } from 'react-redux';
import { addItem } from '../reducer';
import AddItemForm from '../components/AddItemForm';

export default connect(null, dispatch => ({
  addItem: (itemName: string, serialNumber) =>
    dispatch(addItem(itemName, serialNumber)),
}))(AddItemForm);
