// @flow
import React from 'react';
import { connect } from 'react-redux';
import { confirmReturn } from '../reducer';
import type { Request } from '../types';
import type { State } from '../reducer';

type RequestCardProps = {
  request: Request,
  account: string,
  onConfirmReturn: (requestId: number) => void,
};

export function RequestCard({
  request,
  account,
  onConfirmReturn,
}: RequestCardProps) {
  return (
    <div className="col-lg-4 col-md-6 col-xs-12 pb-3">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{request.itemName}</h4>
          <dl className="row">
            <dt className="col-4">Owner</dt>
            <dd className="col-8">{request.owner}</dd>
            <dt className="col-4">Client</dt>
            <dd className="col-8">{request.client}</dd>
            <dt className="col-4">Fee</dt>
            <dd className="col-8">{request.feeEther} </dd>
            <dt className="col-4">Start</dt>
            <dd className="col-8">{request.start}</dd>
            <dt className="col-4">End</dt>
            <dd className="col-8">{request.end}</dd>
          </dl>
          {request.owner === account && (
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={() => onConfirmReturn(request.requestId)}
            >
              Confirm Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

type OnLoanListProps = {
  requests: Request[],
  account: string,
  onConfirmReturn: (requestId: number) => void,
};

export function OnLoanList({
  requests,
  account,
  onConfirmReturn,
}: OnLoanListProps) {
  return (
    <div className="row">
      {requests
        .filter(req => req.state === 'accepted')
        .map(req => (
          <RequestCard
            key={req.requestId}
            request={req}
            account={account}
            onConfirmReturn={onConfirmReturn}
          />
        ))}
    </div>
  );
}

export default connect(
  (state: State) => ({
    requests: state.requests,
    account: state.account,
  }),
  dispatch => ({
    onConfirmReturn: (requestId: number) => dispatch(confirmReturn(requestId)),
  })
)(OnLoanList);
