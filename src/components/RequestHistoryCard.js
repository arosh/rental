// @flow
import React from 'react';
import type { Request } from '../types';

function capitalize(s: string) {
  if (s.length === 0) {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

type RequestHistoryCardProps = {
  request: Request,
};

export const RequestHistoryCard = ({ request }: RequestHistoryCardProps) => (
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
          <dt className="col-4">Status</dt>
          <dd className="col-8">{capitalize(request.state)}</dd>
        </dl>
      </div>
    </div>
  </div>
);

export default RequestHistoryCard;
