// @flow
type Action = {
  type: string,
  payload: any,
};

type State = {
  message: string,
};

const initialState: State = {
  message: 'hello, world',
};

export const updateMessage = (message: string) => {
  return {
    type: 'message/update',
    payload: {
      message,
    },
  };
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'message/update': {
      return { ...state, message: action.payload.message };
    }
    default: {
      return state;
    }
  }
};
