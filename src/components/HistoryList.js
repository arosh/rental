// @flow
import React from 'react';

import type { Request } from '../types';
import HistoryCard from './HistoryCard';

type HistoryListProps = {
  requests: Request[],
};

export default ({ requests }: HistoryListProps) => {
  const rows = requests.filter(
    req => req.state === 'canceled' || req.state === 'finished'
  );
  return (
    <div>
      <h3 hidden={rows.length === 0}>History</h3>
      <div className="row">
        {rows.map(req => <HistoryCard key={req.requestId} history={req} />)}
      </div>
    </div>
  );
};
