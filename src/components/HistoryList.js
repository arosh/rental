// @flow
import React from 'react';
import { connect } from 'react-redux';
import HistoryCard from './HistoryCard';
import type { Request } from '../types';
import type { State } from '../reducer';

type HistoryListProps = {
  requests: Request[],
};

export const HistoryList = ({ requests }: HistoryListProps) => (
  <div className="row">
    {requests
      .filter(req => req.state === 'canceled' || req.state === 'finished')
      .map(req => <HistoryCard key={req.requestId} request={req} />)}
  </div>
);

export default connect((state: State) => ({
  requests: state.requests,
}))(HistoryList);
