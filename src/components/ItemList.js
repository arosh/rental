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

export function ItemList(props: ItemListProps) {
  const { items, sendRequest, account } = props;
  return (
    <div className="row">
      {items
        .filter((item: Item) => item.state === 'idle')
        .map((item: Item) => (
          <ItemCard
            key={item.itemId}
            item={item}
            sendRequest={sendRequest}
            account={account}
          />
        ))}
    </div>
  );
}

export default connect(
  (state: State) => ({
    items: state.items,
    account: state.account,
  }),
  dispatch => ({
    sendRequest: (args: SendRequestArgs) => dispatch(sendRequest(args)),
  })
)(ItemList);
