// @flow
import React from 'react';
import type { Request } from '../types';

type RequestCardProps = {
  request: Request,
  account: string,
  onAccept: (requestId: number) => void,
  onCancel: (requestId: number) => void,
};

export const RequestCard = (props: RequestCardProps) => (
  <div className="col-lg-4 col-md-6 col-xs-12 pb-3">
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">{props.request.itemName}</h4>
        <dl>
          <dt>Owner</dt>
          <dd>{props.request.owner}</dd>
          <dt>Client</dt>
          <dd>{props.request.client}</dd>
          <dt>S/N</dt>
          <dd>{props.request.serialNumber}</dd>
          <dt>Fee</dt>
          <dd>{props.request.feeEther} </dd>
          <dt>Start</dt>
          <dd>{props.request.start}</dd>
          <dt>End</dt>
          <dd>{props.request.end}</dd>
        </dl>
        {props.request.owner === props.account && (
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => props.onAccept(props.request.requestId)}
          >
            Accept
          </button>
        )}
        {props.request.client === props.account && (
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={() => props.onCancel(props.request.requestId)}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  </div>
);

export default RequestCard;
