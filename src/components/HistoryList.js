// @flow
import React from 'react';
import { connect } from 'react-redux';

import HistoryCard from './HistoryCard';

import type { Request } from '../types';
import type { State } from '../reducer';

type HistoryListProps = {
  requests: Request[],
};

export const HistoryList = ({ requests }: HistoryListProps) => {
  const rows = requests.filter(
    req => req.state === 'canceled' || req.state === 'finished'
  );
  return (
    <div>
      <h3 hidden={rows.length === 0}>History</h3>
      <div className="row">
        {rows.map(req => <HistoryCard key={req.requestId} request={req} />)}
      </div>
    </div>
  );
};

export default connect((state: State) => ({
  requests: state.requests,
}))(HistoryList);
