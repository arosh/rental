// @flow
import * as eth from './infra/ethereum';
import * as deepEqual from 'deep-equal';
import type { Item, Request, SendRequestArgs } from './types';

type Action = {
  type: string,
  payload: any,
};

type Dispatch = (Action | (Dispatch => void)) => void;

export type State = {
  network: string,
  contractAddress: string,
  account: string,
  items: Item[],
  requests: Request[],
};

const initialState: State = {
  network: '',
  contractAddress: '',
  account: '',
  items: [],
  requests: [],
};

const SET_NETWORK = 'SET_NETWORK';
const SET_CONTRACT_ADDRESS = 'SET_CONTRACT_ADDRESS';
const SET_ACCOUNT = 'SET_ACCOUNT';
const SET_ITEMS = 'SET_ITEMS';
const SET_REQUESTS = 'SET_REQUESTS';

export function updateNetwork() {
  return async (dispatch: Dispatch, getState: () => State) => {
    const { network } = getState();
    const newNetwork = await eth.getNetwork();
    if (network !== newNetwork) {
      dispatch({
        type: SET_NETWORK,
        payload: {
          network: newNetwork,
        },
      });
      dispatch(setDefaultContractAddress());
    }
  };
}

export function setDefaultContractAddress() {
  return (dispatch: Dispatch) => {
    eth.getDefaultContractAddress().then(contractAddress => {
      dispatch(updateContractAddress(contractAddress));
    });
  };
}

export function updateContractAddress(contractAddress: string) {
  return {
    type: SET_CONTRACT_ADDRESS,
    payload: {
      contractAddress,
    },
  };
}

export function updateAccount() {
  return async (dispatch: Dispatch, getState: () => State) => {
    const { account } = getState();
    const newAccount = await eth.getAccount();
    if (account !== newAccount) {
      dispatch({
        type: SET_ACCOUNT,
        payload: {
          account: newAccount,
        },
      });
    }
  };
}

export function updateItems() {
  return async (dispatch: Dispatch, getState: () => State) => {
    const { contractAddress, items } = getState();
    const newItems = await eth.getItems(contractAddress);
    newItems.reverse();
    if (!deepEqual(items, newItems)) {
      dispatch({
        type: SET_ITEMS,
        payload: {
          items: newItems,
        },
      });
    }
  };
}

export function addItem(itemName: string, serialNumber: string) {
  return (dispatch: Dispatch, getState: () => State) => {
    const { contractAddress, account } = getState();
    eth.addItem(contractAddress, account, itemName, serialNumber);
  };
}

export function updateRequests() {
  return async (dispatch: Dispatch, getState: () => State) => {
    const { contractAddress, requests } = getState();
    const newRequests = await eth.getRequests(contractAddress);
    newRequests.reverse();
    if (!deepEqual(requests, newRequests)) {
      dispatch({
        type: SET_REQUESTS,
        payload: {
          requests: newRequests,
        },
      });
    }
  };
}

export function sendRequest(args: SendRequestArgs) {
  return (dispatch: Dispatch, getState: () => State) => {
    const { contractAddress, account } = getState();
    eth.sendRequest(contractAddress, account, args);
  };
}

export function acceptRequest(requestId: number) {
  return (dispatch: Dispatch, getState: () => State) => {
    const { contractAddress, account } = getState();
    eth.acceptRequest(contractAddress, account, requestId);
  };
}

export function cancelRequest(requestId: number) {
  return (dispatch: Dispatch, getState: () => State) => {
    const { contractAddress, account } = getState();
    eth.cancelRequest(contractAddress, account, requestId);
  };
}

export function confirmReturn(requestId: number) {
  return (dispatch: Dispatch, getState: () => State) => {
    const { contractAddress, account } = getState();
    eth.acceptReturning(contractAddress, account, requestId);
  };
}

export default (state: State = initialState, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case SET_NETWORK:
      return {
        ...state,
        network: payload.network,
      };
    case SET_CONTRACT_ADDRESS:
      return {
        ...state,
        contractAddress: payload.contractAddress,
      };
    case SET_ACCOUNT:
      return {
        ...state,
        account: payload.account,
      };
    case SET_ITEMS:
      return {
        ...state,
        items: payload.items,
      };
    case SET_REQUESTS:
      return {
        ...state,
        requests: payload.requests,
      };
    default: {
      return state;
    }
  }
};
