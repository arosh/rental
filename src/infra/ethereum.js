import * as Web3 from 'web3';

export function setupWeb3() {
  if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider);
  } /* else {
    window.web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    );
  } */
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

export function getNetwork() {
  const web3 = window.web3;
  return new Promise((resolve: string => void, reject) => {
    web3.version.getNetwork((err, netId) => {
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

export function getBlockNumber(): Promise<number> {
  const web3: Web3 = window.web3;
  return new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((err, blockNumber) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(blockNumber);
    });
  });
}

export function setOnAccountChange(callback: () => void) {
  const web3: Web3 = window.web3;
  let account = web3.eth.accounts[0];
  return setInterval(function() {
    if (web3.eth.accounts[0] !== account) {
      account = web3.eth.accounts[0];
    }
  }, 100);
}

const contractAddress = '0x7599c8900e6c9f57078d2248d2596fd3a4c4f8c2';

// prettier-ignore
const contractABI = [{"constant":false,"inputs":[{"name":"_message","type":"string"}],"name":"setMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"greet","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"message","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_message","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_message","type":"string"}],"name":"greetEvent","type":"event"}];

export function getInstance() {
  const web3: Web3 = window.web3;
  const contract = web3.eth.contract(contractABI);
  const instance = contract.at(contractAddress);
  return instance;
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
