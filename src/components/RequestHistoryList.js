// @flow
import React from 'react';
import { connect } from 'react-redux';
import RequestHistoryCard from './RequestHistoryCard';
import type { Request } from '../types';
import type { State } from '../reducer';

type RequestHistoryListProps = {
  requests: Request[],
};

export const RequestHistoryList = ({ requests }: RequestHistoryListProps) => (
  <div className="row">
    {requests
      .filter(req => req.state === 'canceled' || req.state === 'finished')
      .map(req => <RequestHistoryCard key={req.requestId} request={req} />)}
  </div>
);

export default connect((state: State) => ({
  requests: state.requests,
}))(RequestHistoryList);
