// @flow
import React from 'react';
import type { Request } from '../types';

function capitalize(s: string) {
  if (s.length === 0) {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

type HistoryCardProps = {
  request: Request,
};

export const HistoryCard = ({ request }: HistoryCardProps) => (
  <div className="col-lg-4 col-md-6 col-xs-12 pb-3">
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{request.itemName}</h4>
        <dl>
          <dt>Owner</dt>
          <dd>{request.ownerAddress}</dd>
          <dt>Client</dt>
          <dd>{request.clientAddress}</dd>
          <dt>S/N</dt>
          <dd>{request.serialNumber}</dd>
          <dt>Fee</dt>
          <dd>{request.feeEther} </dd>
          <dt>Start</dt>
          <dd>{request.start}</dd>
          <dt>End</dt>
          <dd>{request.end}</dd>
          <dt>Status</dt>
          <dd>{capitalize(request.state)}</dd>
        </dl>
      </div>
    </div>
  </div>
);

export default HistoryCard;
