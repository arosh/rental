// @flow
import React from 'react';
import { connect } from 'react-redux';

import OnLoanCard from './OnLoanCard';
import { confirmReturn } from '../reducer';

import type { Request } from '../types';
import type { State } from '../reducer';

type OnLoanListProps = {
  requests: Request[],
  account: string,
  onConfirmReturn: (requestId: number) => void,
};

export const OnLoanList = (props: OnLoanListProps) => {
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

export default connect(
  (state: State) => ({
    requests: state.requests,
    account: state.account,
  }),
  dispatch => ({
    onConfirmReturn: (requestId: number) => dispatch(confirmReturn(requestId)),
  })
)(OnLoanList);
