import React from 'react';
import { Container } from 'semantic-ui-react';

import ExchangeOverviewList from './ExchangeOverviewList';

const ExchangeOverview = () => {
  return (
    <Container className='content'>
      <ExchangeOverviewList />
    </Container>
  );
};

export default ExchangeOverview;
