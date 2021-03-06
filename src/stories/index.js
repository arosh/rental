// @flow
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import * as Web3 from 'web3';

import type { Request } from '../types';

import AddItemForm from '../components/AddItemForm';
import ContractDialog from '../components/ContractDialog';
import HistoryCard from '../components/HistoryCard';
import MistBalloon from '../components/MistBalloon';
import RequestCard from '../components/RequestCard';
import Web3Status from '../components/Web3Status';

const Decorator = story => <MuiThemeProvider>{story()}</MuiThemeProvider>;

window.web3 = new Web3();

storiesOf('MistBalloon', module)
  .addDecorator(Decorator)
  .add('display', () => <MistBalloon display />)
  .add('none', () => <MistBalloon display={false} />);

const request: Request = {
  requestId: 123,
  clientAddress: '0xccccc11111222223333344444555556666600000',
  ownerAddress: '0x00000aaaaabbbbbcccccdddddeeeeefffff00000',
  itemId: 456,
  itemName: 'すごいつりざお',
  serialNumber: '789',
  feeEther: '0.1',
  start: '2018-02-28',
  end: '2018-03-01',
  state: 'pending',
};

storiesOf('AddItemForm', module)
  .addDecorator(Decorator)
  .add('default', () => <AddItemForm addItem={action('addItem')} />);

storiesOf('ContractDialog', module)
  .addDecorator(Decorator)
  .add('default', () => (
    <ContractDialog
      open
      onSubmit={action('onSubmit')}
      onCancel={action('onCancel')}
    />
  ));

storiesOf('RequestCard', module)
  .addDecorator(Decorator)
  .add('default', () => (
    <RequestCard
      request={request}
      userAddress="0xaaaaa11111222223333344444555556666600000"
      onAccept={action('accept')}
      onCancel={action('cancel')}
    />
  ))
  .add('client', () => (
    <RequestCard
      request={request}
      userAddress={request.clientAddress}
      onAccept={action('accept')}
      onCancel={action('cancel')}
    />
  ))
  .add('owner', () => (
    <RequestCard
      request={request}
      userAddress={request.ownerAddress}
      onAccept={action('accept')}
      onCancel={action('cancel')}
    />
  ));

storiesOf('HistoryCard', module)
  .addDecorator(Decorator)
  .add('default', () => <HistoryCard history={request} />);

storiesOf('Web3Status', module)
  .addDecorator(Decorator)
  .add('default', () => (
    <Web3Status
      isConnected
      network="Ropsten"
      account={request.ownerAddress}
      contractAddress={request.clientAddress}
      syncNetworkName={action('syncNetworkName')}
      openContractAddressDialog={action('openContractAddressDialog')}
      syncAccountAddress={action('syncAccountAddress')}
    />
  ));
