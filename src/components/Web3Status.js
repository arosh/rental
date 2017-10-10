// @flow
import React from 'react';

export default () => {
  const { web3 } = window;
  return (
    <div>
      <dl className="dl-horizontal">
        <dt>web3 available</dt>
        <dd>{web3 !== undefined ? 'yes' : 'no'}</dd>
        <dt>account available</dt>
        <dd>{web3.eth.accounts !== undefined ? 'yes' : 'no'}</dd>
      </dl>
    </div>
  );
};
