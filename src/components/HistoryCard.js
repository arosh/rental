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
  history: Request,
};

export default ({ history }: HistoryCardProps) => (
  <div className="col-lg-4 col-md-6 col-xs-12 pb-3">
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{history.itemName}</h4>
        <dl>
          <dt>Owner</dt>
          <dd>{history.ownerAddress}</dd>
          <dt>Client</dt>
          <dd>{history.clientAddress}</dd>
          <dt>S/N</dt>
          <dd>{history.serialNumber}</dd>
          <dt>Fee</dt>
          <dd>{history.feeEther} </dd>
          <dt>Start</dt>
          <dd>{history.start}</dd>
          <dt>End</dt>
          <dd>{history.end}</dd>
          <dt>Status</dt>
          <dd>{capitalize(history.state)}</dd>
        </dl>
      </div>
    </div>
  </div>
);
