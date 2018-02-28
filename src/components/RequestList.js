// @flow
import React from 'react';

import RequestCard from './RequestCard';

import type { Request } from '../types';

type RequestListProps = {
  requests: Request[],
  account: string,
  onAccept: (requestId: number) => void,
  onCancel: (requestId: number) => void,
};

export default (props: RequestListProps) => {
  const rows = props.requests.filter(req => req.state === 'pending');
  return (
    <div>
      <h3 hidden={rows.length === 0}>Requests</h3>
      <div className="row">
        {rows.map(req => (
          <RequestCard
            key={req.requestId}
            request={req}
            userAddress={props.account}
            onAccept={props.onAccept}
            onCancel={props.onCancel}
          />
        ))}
      </div>
    </div>
  );
};
