// @flow
import React from 'react';
import { connect } from 'react-redux';

import RequestCard from './RequestCard';
import { acceptRequest, cancelRequest } from '../reducer';

import type { Request } from '../types';
import type { State } from '../reducer';

type RequestListProps = {
  requests: Request[],
  account: string,
  onAccept: (requestId: number) => void,
  onCancel: (requestId: number) => void,
};

export const RequestList = (props: RequestListProps) => {
  const rows = props.requests.filter(req => req.state === 'pending');
  return (
    <div>
      <h3 hidden={rows.length === 0}>Requests</h3>
      <div className="row">
        {rows.map(req => (
          <RequestCard
            key={req.requestId}
            request={req}
            account={props.account}
            onAccept={props.onAccept}
            onCancel={props.onCancel}
          />
        ))}
      </div>
    </div>
  );
};

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
