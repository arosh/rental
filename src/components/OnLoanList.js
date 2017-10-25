// @flow
import React from 'react';
import { connect } from 'react-redux';
import {acceptRequest, cancelRequest} from '../reducer';
import type { Request } from '../types';
import type { State } from '../reducer';

type RequestCardProps = {
  request: Request,
  account: string,
  onAccept: (requestId: number) => void,
  onCancel: (requestId: number) => void,
};

export function RequestCard({
  request,
  account,
  onAccept,
  onCancel,
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
              onClick={() => onAccept(request.requestId)}
            >
              Accept
            </button>
          )}
          {request.client === account && (
            <button
              type="button"
              className="btn btn-outline-warning"
              onClick={() => onCancel(request.requestId)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

type RequestListProps = {
  requests: Request[],
  account: string,
  onAccept: (requestId: number) => void,
  onCancel: (requestId: number) => void,
};

export function RequestList({
  requests,
  account,
  onAccept,
  onCancel,
}: RequestListProps) {
  return (
    <div className="row">
      {requests.filter(req => req.state === 'pending').map(req => (
        <RequestCard
          key={req.requestId}
          request={req}
          account={account}
          onAccept={onAccept}
          onCancel={onCancel}
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
    onAccept: (requestId: number) => dispatch(acceptRequest(requestId)),
    onCancel: (requestId: number) => dispatch(cancelRequest(requestId)),
  })
)(RequestList);
