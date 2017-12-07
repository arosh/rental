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
  contractAddressDialogOpen: boolean,
};

const initialState: State = {
  network: '',
  contractAddress: '',
  account: '',
  items: [],
  requests: [],
  contractAddressDialogOpen: false,
};

const SET_NETWORK = 'SET_NETWORK';
const SET_CONTRACT_ADDRESS = 'SET_CONTRACT_ADDRESS';
const SET_ACCOUNT = 'SET_ACCOUNT';
const SET_ITEMS = 'SET_ITEMS';
const SET_REQUESTS = 'SET_REQUESTS';
const SET_CONTRACT_ADDRESS_DIALOG_OPEN = 'SET_CONTRACT_ADDRESS_DIALOG_OPEN';

/**
 * Ethereumのネットワーク名をWeb3から読み取ってstateに反映する
 */
export function syncNetworkName() {
  return async (dispatch: Dispatch, getState: () => State) => {
    const newNetwork = await eth.getNetwork();
    const { network } = getState();
    if (network !== newNetwork) {
      dispatch({
        type: SET_NETWORK,
        payload: {
          network: newNetwork,
        },
      });
    }
  };
}

export function setContractAddress(contractAddress: string) {
  return {
    type: SET_CONTRACT_ADDRESS,
    payload: {
      contractAddress,
    },
  };
}

export function syncAccountAddress() {
  return async (dispatch: Dispatch, getState: () => State) => {
    const newAccount = await eth.getAccount();
    const { account } = getState();
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

export function syncItems() {
  return async (dispatch: Dispatch, getState: () => State) => {
    const { contractAddress } = getState();
    const newItems = await eth.getItems(contractAddress);
    newItems.reverse();
    const { items } = getState();
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

export function syncRequests() {
  return async (dispatch: Dispatch, getState: () => State) => {
    const { contractAddress } = getState();
    const newRequests = await eth.getRequests(contractAddress);
    newRequests.reverse();
    const { requests } = getState();
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

export function toggleContractAddressDialog(open: boolean): Action {
  return {
    type: SET_CONTRACT_ADDRESS_DIALOG_OPEN,
    payload: {
      open,
    },
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
    case SET_CONTRACT_ADDRESS_DIALOG_OPEN:
      return {
        ...state,
        contractAddressDialogOpen: payload.open,
      };
    default: {
      return state;
    }
  }
};
