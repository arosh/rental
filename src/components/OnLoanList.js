// @flow
import React from 'react';
import { connect } from 'react-redux';
import { confirmReturn } from '../reducer';
import OnLoanCard from './OnLoanCard';
import type { Request } from '../types';
import type { State } from '../reducer';

type OnLoanListProps = {
  requests: Request[],
  account: string,
  onConfirmReturn: (requestId: number) => void,
};

export const OnLoanList = (props: OnLoanListProps) => (
  <div className="row">
    {props.requests
      .filter(req => req.state === 'accepted')
      .map(req => (
        <OnLoanCard
          key={req.requestId}
          request={req}
          account={props.account}
          onConfirmReturn={props.onConfirmReturn}
        />
      ))}
  </div>
);

export default connect(
  (state: State) => ({
    requests: state.requests,
    account: state.account,
  }),
  dispatch => ({
    onConfirmReturn: (requestId: number) => dispatch(confirmReturn(requestId)),
  })
)(OnLoanList);
