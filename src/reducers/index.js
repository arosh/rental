// @flow
type Action = {
  type: string,
  payload: any,
};

type State = {
  greeting: string,
  blockNumber: number,
};

const initialState: State = {
  greeting: 'hello, world',
  blockNumber: 0,
};

export function updateGreeting(greeting: string): Action {
  return {
    type: 'greeting/update',
    payload: greeting,
  };
}

export function updateBlockNumber(blockNumber: number): Action {
  return {
    type: 'blockNumber/update',
    payload: blockNumber,
  };
}

export default (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case 'greeting/update': {
      return { ...state, greeting: payload };
    }
    case 'blockNumber/update': {
      return { ...state, blockNumber: payload };
    }
    default: {
      return state;
    }
  }
};
