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

export const RequestList = (props: RequestListProps) => (
  <div className="row">
    {props.requests
      .filter(req => req.state === 'pending')
      .map(req => (
        <RequestCard
          key={req.requestId}
          request={req}
          account={props.account}
          onAccept={props.onAccept}
          onCancel={props.onCancel}
        />
      ))}
  </div>
);

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
