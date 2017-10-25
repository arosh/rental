// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Request } from '../types';

type RequestCardProps = {
  request: Request,
};

export function RequestCard({request}: RequestCardProps) {
  return (
    <div className="col-lg-4 col-md-6 col-xs-12 pb-3">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{request.itemName}</h4>
          <dl className="row">
            <dt className="col-4">Owner</dt>
            <dd className="col-8">
              {request.owner}
            </dd>
            <dt className="col-4">Client</dt>
            <dd className="col-8">
              {request.client}
            </dd>
            <dt className="col-4">Fee</dt>
            <dd className="col-8">{request.feeEther} </dd>
            <dt className="col-4">Start</dt>
            <dd className="col-8">{request.start}</dd>
            <dt className="col-4">End</dt>
            <dd className="col-8">{request.end}</dd>
          </dl>
          <button type="button" className="btn btn-outline-success">
            Accept
          </button>
          <button type="button" className="btn btn-outline-warning ml-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

type RequestListProps = {
  requests: Request[],
};

export function RequestList(props: RequestListProps) {
  const { requests } = props;
  return (
    <div className="row">
      {requests.map(req => <RequestCard key={req.requestId} request={req} />)}
    </div>
  );
}

export default connect(
  state => ({
    requests: state.requests,
  }),
  dispatch => ({})
)(RequestList);
