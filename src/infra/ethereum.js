// @flow
import * as Web3 from 'web3';
import type { Item, Request, SendRequestArgs } from '../types';

export function setupWeb3() {
  if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    );
  }
}

export async function getAccount(): Promise<string> {
  return new Promise((resolve, reject) => {
    window.web3.eth.getAccounts(async (err, accounts) => {
      if (err) {
        reject(err);
        return;
      }
      if (accounts.length > 0) {
        const account = accounts[0];
        resolve(account);
        return;
      }
      resolve('');
    });
  });
}

export async function getNetwork(): Promise<string> {
  return new Promise((resolve, reject) => {
    window.web3.version.getNetwork((err, netId) => {
      if (err) {
        reject(err);
        return;
      }
      switch (netId) {
        case '1':
          resolve('Mainnet');
          break;
        case '2':
          resolve('Morden');
          break;
        case '3':
          resolve('Ropsten');
          break;
        case '4':
          resolve('Rinkeby');
          break;
        case '42':
          resolve('Kovan');
          break;
        default:
          resolve('Unknown');
          break;
      }
    });
  });
}

// prettier-ignore
const contractABI = [{"constant":true,"inputs":[],"name":"getItemsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_requestId","type":"uint256"}],"name":"cancelRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_requestId","type":"uint256"}],"name":"acceptRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_requestId","type":"uint256"}],"name":"acceptReturning","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_serialNumber","type":"string"}],"name":"addItem","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"requests","outputs":[{"name":"client","type":"address"},{"name":"itemId","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"start","type":"string"},{"name":"end","type":"string"},{"name":"state","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_itemId","type":"uint256"},{"name":"_start","type":"string"},{"name":"_end","type":"string"}],"name":"addRequest","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"items","outputs":[{"name":"owner","type":"address"},{"name":"name","type":"string"},{"name":"serialNumber","type":"string"},{"name":"state","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRequestsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];

export function getInstance(contractAddress: string) {
  const web3: Web3 = window.web3;
  const contract = web3.eth.contract(contractABI);
  const instance = contract.at(contractAddress);
  return instance;
}

function toItemState(state): string {
  const s = state.toString(10);
  switch (s) {
    case '0':
      return 'idle';
    case '1':
      return 'busy';
    default:
      throw new Error('Unknown ItemState (state = ' + state + ')');
  }
}

function toRequestState(state): string {
  const s = state.toString(10);
  switch (s) {
    case '0':
      return 'pending';
    case '1':
      return 'canceled';
    case '2':
      return 'accepted';
    case '3':
      return 'finished';
    default:
      throw new Error('Unknown RequestState (state = ' + state + ')');
  }
}

export async function addItem(
  contractAddress: string,
  account: string,
  itemName: string,
  serialNumber: string
): Promise<number> {
  const instance = getInstance(contractAddress);
  return new Promise((resolve, reject) => {
    instance.addItem(
      itemName,
      serialNumber,
      { from: account },
      (err, index) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(index);
      }
    );
  });
}

export function getItemsLength(contractAddress: string): Promise<number> {
  const instance = getInstance(contractAddress);
  return new Promise((resolve, reject) => {
    instance.getItemsLength((err, length) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(length);
    });
  });
}

export function getItem(contractAddress: string, index: number): Promise<Item> {
  const instance = getInstance(contractAddress);
  return new Promise((resolve, reject) => {
    instance.items(index, (err, item) => {
      if (err) {
        reject(err);
        return;
      }
      const state = toItemState(item[3]);
      resolve({
        itemId: index,
        owner: item[0],
        name: item[1],
        serialNumber: item[2],
        state: state,
      });
    });
  });
}

export async function getItems(contractAddress: string): Promise<Item[]> {
  const length = await getItemsLength(contractAddress);
  const p = [];
  for (let i = 0; i < length; i++) {
    p.push(getItem(contractAddress, i));
  }
  return Promise.all(p);
}

export async function sendRequest(
  contractAddress: string,
  account: string,
  args: SendRequestArgs
): Promise<void> {
  const instance = getInstance(contractAddress);
  const feeWei = window.web3.toWei(args.fee, args.unit);
  return new Promise((resolve, reject) => {
    instance.addRequest(
      args.itemId,
      args.start,
      args.end,
      { from: account, value: feeWei },
      (err, index) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(index);
      }
    );
  });
}

export function getRequestsLength(contractAddress: string): Promise<number> {
  const instance = getInstance(contractAddress);
  return new Promise((resolve, reject) => {
    instance.getRequestsLength((err, length) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(length);
    });
  });
}

export function getRequest(
  contractAddress: string,
  index: number
): Promise<Request> {
  const instance = getInstance(contractAddress);
  return new Promise((resolve, reject) => {
    instance.requests(index, async (err, req) => {
      if (err) {
        reject(err);
        return;
      }
      const itemId = req[1];
      const item = await getItem(contractAddress, itemId);
      const state = toRequestState(req[5]);
      const feeEther = window.web3.fromWei(req[2], 'ether').toString(10);
      resolve({
        requestId: index,
        client: req[0],
        owner: item.owner,
        itemId,
        itemName: item.name,
        serialNumber: item.serialNumber,
        feeEther,
        start: req[3],
        end: req[4],
        state,
      });
    });
  });
}

export async function getRequests(contractAddress: string): Promise<Request[]> {
  const length = await getRequestsLength(contractAddress);
  const p = [];
  for (let i = 0; i < length; i++) {
    p.push(getRequest(contractAddress, i));
  }
  return Promise.all(p);
}

export async function acceptRequest(
  contractAddress: string,
  account: string,
  requestId: number
): Promise<void> {
  const instance = getInstance(contractAddress);
  return new Promise((resolve, reject) => {
    instance.acceptRequest(requestId, { from: account }, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export async function cancelRequest(
  contractAddress: string,
  account: string,
  requestId: number
): Promise<void> {
  const instance = getInstance(contractAddress);
  return new Promise((resolve, reject) => {
    instance.cancelRequest(requestId, { from: account }, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export async function acceptReturning(
  contractAddress: string,
  account: string,
  requestId: number
): Promise<void> {
  const instance = getInstance(contractAddress);
  return new Promise((resolve, reject) => {
    instance.acceptReturning(requestId, { from: account }, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export function isAddress(s: string): boolean {
  return /^0x[0-9a-f]{40}$/.test(s);
}
