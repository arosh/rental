// @flow
import React from 'react';
import { connect } from 'react-redux';
import ItemCard from './ItemCard';
import type { Item, SendRequestArgs } from '../types';
import { sendRequest } from '../reducer';
import type { State } from '../reducer';

type ItemListProps = {
  items: Item[],
  sendRequest: SendRequestArgs => void,
  account: string,
};

export const ItemList = (props: ItemListProps) => (
  <div className="row">
    {props.items
      .filter((item: Item) => item.state === 'idle')
      .map((item: Item) => (
        <ItemCard
          key={item.itemId}
          item={item}
          sendRequest={props.sendRequest}
          account={props.account}
        />
      ))}
  </div>
);

export default connect(
  (state: State) => ({
    items: state.items,
    account: state.account,
  }),
  dispatch => ({
    sendRequest: (args: SendRequestArgs) => dispatch(sendRequest(args)),
  })
)(ItemList);
