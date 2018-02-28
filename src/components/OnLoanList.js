// @flow
import React from 'react';

import OnLoanCard from './OnLoanCard';

import type { Request } from '../types';

type OnLoanListProps = {
  requests: Request[],
  account: string,
  onConfirmReturn: (requestId: number) => void,
};

export default (props: OnLoanListProps) => {
  const rows = props.requests.filter(req => req.state === 'accepted');
  return (
    <div>
      <h3 hidden={rows.length === 0}>On Loan</h3>
      <div className="row">
        {rows.map(req => (
          <OnLoanCard
            key={req.requestId}
            request={req}
            account={props.account}
            onConfirmReturn={props.onConfirmReturn}
          />
        ))}
      </div>
    </div>
  );
};
