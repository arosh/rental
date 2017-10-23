// @flow
type Action = {
  type: string,
  payload: any,
};

type State = {};

const initialState: State = {};

export default (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    default: {
      return state;
    }
  }
};
