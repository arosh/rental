// @flow
import * as eth from './infra/ethereum';
import * as deepEqual from 'deep-equal';
import type { Item, SendRequestArgs } from './types';

type Action = {
  type: string,
  payload: any,
};

type State = {
  items: Item[],
};

const initialState: State = {
  items: [],
};

export function addItem(itemName: string) {
  return () => {
    eth.addItem(itemName);
  };
}

export function updateItems() {
  return async (dispatch: Action => void, getState: () => State) => {
    const { items } = getState();
    const newItems = await eth.getItems();
    newItems.reverse();
    if (!deepEqual(items, newItems)) {
      dispatch({
        type: 'SET/items',
        payload: {
          items: newItems,
        },
      });
    }
  };
}

export function sendRequest(args: SendRequestArgs) {
  return () => {
    eth.sendRequest(args);
  };
}

export default (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case 'SET/items': {
      return {
        ...state,
        items: payload.items,
      };
    }
    default: {
      return state;
    }
  }
};
