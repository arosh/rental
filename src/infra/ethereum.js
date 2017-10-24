import * as Web3 from 'web3';
import type { Item, RequestArgs } from '../types';

export async function setupWeb3() {
  if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    );
  }
  await setupDefaultAccount();
}

export function setupDefaultAccount() {
  return new Promise((resolve, reject) => {
    window.web3.eth.getAccounts((err, accounts) => {
      if (err) {
        reject(err);
        return;
      }
      window.web3.eth.defaultAccount = accounts[0];
      resolve();
    });
  });
}

export function fromUtf8(str: string) {
  return window.web3.fromUtf8(str);
}

export function toUtf8(hex: string) {
  return window.web3.toUtf8(hex);
}

// export function getNetwork() {
//   const web3 = window.web3;
//   return new Promise((resolve: string => void, reject) => {
//     web3.version.getNetwork((err, netId) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       switch (netId) {
//         case '1':
//           resolve('Mainnet');
//           break;
//         case '2':
//           resolve('Morden');
//           break;
//         case '3':
//           resolve('Ropsten');
//           break;
//         case '4':
//           resolve('Rinkeby');
//           break;
//         case '42':
//           resolve('Kovan');
//           break;
//         default:
//           resolve('Unknown');
//           break;
//       }
//     });
//   });
// }

// export function getBlockNumber(): Promise<number> {
//   const web3: Web3 = window.web3;
//   return new Promise((resolve, reject) => {
//     web3.eth.getBlockNumber((err, blockNumber) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(blockNumber);
//     });
//   });
// }

// export function setOnAccountChange(callback: () => void) {
//   const web3: Web3 = window.web3;
//   let account = web3.eth.accounts[0];
//   return setInterval(function() {
//     if (web3.eth.accounts[0] !== account) {
//       account = web3.eth.accounts[0];
//     }
//   }, 100);
// }

// prettier-ignore
const contractABI = [{"constant":true,"inputs":[],"name":"getItemsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"}],"name":"addItem","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_requestId","type":"uint256"}],"name":"cancelRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_requestId","type":"uint256"}],"name":"acceptRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_requestId","type":"uint256"}],"name":"acceptReturning","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"requests","outputs":[{"name":"client","type":"address"},{"name":"itemId","type":"uint256"},{"name":"fee","type":"uint256"},{"name":"start","type":"string"},{"name":"end","type":"string"},{"name":"state","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_itemId","type":"uint256"},{"name":"_start","type":"string"},{"name":"_end","type":"string"}],"name":"addRequest","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"items","outputs":[{"name":"owner","type":"address"},{"name":"name","type":"string"},{"name":"state","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getRequestsLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];

export function getInstance() {
  const web3: Web3 = window.web3;
  const contract = web3.eth.contract(contractABI);
  const contractAddress = '0x8eBA3C411C05A5D5B462cE4c2B353F5EDa7e89Ad';
  const instance = contract.at(contractAddress);
  return instance;
}

export function addItem(itemName: string): Promise<number> {
  const instance = getInstance();
  return new Promise((resolve, reject) => {
    instance.addItem(itemName, (err, index) => {
      if (err) {
        reject(err);
      }
      resolve(index);
    });
  });
}

export function getItemsLength(): Promise<number> {
  const instance = getInstance();
  return new Promise((resolve, reject) => {
    instance.getItemsLength((err, length) => {
      if (err) {
        reject(err);
      }
      resolve(length);
    });
  });
}

export function getItem(index: number): Promise<Item> {
  const instance = getInstance();
  return new Promise((resolve, reject) => {
    instance.items(index, (err, item) => {
      if (err) {
        reject(err);
      }
      const state = item[2].toString(10) === '0' ? 'idle' : 'busy';
      resolve({ index, owner: item[0], name: item[1], state: state });
    });
  });
}

export function getItems(): Promise<Item[]> {
  return getItemsLength().then(length => {
    const p = [];
    for (let i = 0; i < length; i++) {
      p.push(getItem(i));
    }
    return Promise.all(p);
  });
}

export function sendRequest(args: RequestArgs) {
  console.log(args);
}

export function getMessage(): Promise<string> {
  const instance = getInstance();
  return new Promise((resolve, reject) => {
    instance.message((err, message) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(message);
    });
  });
}

export async function setMessage(message: string): Promise<void> {
  await setupDefaultAccount();
  const instance = getInstance();
  return new Promise((resolve, reject) => {
    instance.setMessage(message, err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export async function greet(): Promise<void> {
  await setupDefaultAccount();
  const instance = getInstance();
  return new Promise((resolve, reject) => {
    instance.greet(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export async function setOnGreet(callback: any => void) {
  const instance = getInstance();
  instance.greetEvent().watch((err, logs) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(logs);
    callback(logs);
  });
}
