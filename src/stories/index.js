// @flow
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import MistBalloon from '../components/MistBalloon';

const Decorator = story => <MuiThemeProvider>{story()}</MuiThemeProvider>;

storiesOf('MistBalloon', module)
  .addDecorator(Decorator)
  .add('display', () => <MistBalloon display />)
  .add('none', () => <MistBalloon display={false} />);
