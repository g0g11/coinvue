import React from 'react';
import { Container } from 'semantic-ui-react';

import ExchangeOverviewList from './exchangeOverview/ExchangeOverviewList';
import SearchBar from './SearchBar';

const ExchangeOverview = () => {
  return (
    <Container className='content'>
      <SearchBar />
      <ExchangeOverviewList />
    </Container>
  );
};

export default ExchangeOverview;
