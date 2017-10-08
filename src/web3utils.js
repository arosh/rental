// @flow
import * as Web3 from 'web3';

export function setupWeb3() {
  if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.web3 = new Web3(
      new Web3.providers.HttpProvider('http://localhost:8545')
    );
  }
}

export const network = {
  Mainnet: Symbol('Mainnet'),
  Morden: Symbol('Morden'),
  Ropsten: Symbol('Ropsten'),
  Rinkeby: Symbol('Rinkeby'),
  Unknown: Symbol('Unknown'),
};

export function getNetwork() {
  window.web3.version.getNetwork((err, netId) => {
    switch (netId) {
      case '1':
        console.log('This is mainnet');
        break;
      case '2':
        console.log('This is the deprecated Morden test network.');
        break;
      case '3':
        console.log('This is the ropsten test network.');
        break;
      default:
        console.log('This is an unknown network.');
    }
  });
}

export function setOnAccountChange(callback: () => void) {
  let account = global.web3.eth.accounts[0];
  return setInterval(function() {
    if (global.web3.eth.accounts[0] !== account) {
      account = global.web3.eth.accounts[0];
    }
  }, 100);
}
