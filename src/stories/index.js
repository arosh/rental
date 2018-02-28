// @flow
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import type { Request } from '../types';

import MistBalloon from '../components/MistBalloon';
import RequestCard from '../components/RequestCard';

const Decorator = story => <MuiThemeProvider>{story()}</MuiThemeProvider>;

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
