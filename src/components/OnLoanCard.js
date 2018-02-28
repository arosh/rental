// @flow
import React from 'react';
import type { Request } from '../types';

type OnLoanCardProps = {
  request: Request,
  account: string,
  onConfirmReturn: (requestId: number) => void,
};

export default ({ request, account, onConfirmReturn }: OnLoanCardProps) => (
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
