import React from 'react';
import { Container } from 'semantic-ui-react';

import CoinOverviewList from './coinOverview/CoinOverviewList';
import SearchBar from './SearchBar';

const CoinOverview = () => {
  return (
    <Container className='content'>
      <SearchBar />
      <CoinOverviewList />
    </Container>
  );
};

export default CoinOverview;
