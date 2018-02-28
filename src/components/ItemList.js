// @flow
import React from 'react';
import ItemCard from './ItemCard';
import type { Item, SendRequestArgs } from '../types';

type ItemListProps = {
  items: Item[],
  sendRequest: SendRequestArgs => void,
  account: string,
};

export default (props: ItemListProps) => (
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
