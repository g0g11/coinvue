import React from 'react';
import { Container } from 'semantic-ui-react';

import CoinOverviewList from './coinOverview/CoinOverviewList';

const CoinOverview = () => {
  return (
    <Container className='content'>
      <CoinOverviewList />
    </Container>
  );
};

export default CoinOverview;
