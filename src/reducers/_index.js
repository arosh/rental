// @flow
import * as eth from '../infra/ethereum';

type Action = {
  type: string,
  payload: any,
};

type State = {
  message: string,
  blockNumber: number,
  pastMessages: string[],
};

const initialState: State = {
  message: '',
  blockNumber: 0,
  pastMessages: [],
};

export function sendMessage(message: string) {
  return (dispatch: any => void) => {
    eth.setMessage(message);
  };
}

export function updateMessage(message: string): Action {
  return {
    type: 'message/update',
    payload: message,
  };
}

export function updateBlockNumber(blockNumber: number): Action {
  return {
    type: 'blockNumber/update',
    payload: blockNumber,
  };
}

export function addPastMessages(message: string): Action {
  return {
    type: 'pastMessages/add',
    payload: message,
  };
}

export function greet() {
  eth.greet();
}

export default (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case 'message/update': {
      return { ...state, message: payload };
    }
    case 'blockNumber/update': {
      return { ...state, blockNumber: payload };
    }
    case 'pastMessages/add': {
      return { ...state, pastMessages: [...state.pastMessages, payload] };
    }
    default: {
      return state;
    }
  }
};
