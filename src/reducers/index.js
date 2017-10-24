// @flow
import * as eth from '../infra/ethereum';
import type { Item, RequestArgs } from '../types';

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

export function updateItems(items: []): Action {
  return {
    type: 'items/update',
    payload: {
      items,
    },
  };
}

export function sendRequest(args: RequestArgs) {
  return () => {
    eth.sendRequest(args);
  };
}

export default (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case 'items/update': {
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
