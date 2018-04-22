import React from 'react';
import { Container } from 'semantic-ui-react';

import PortfolioList from './portfolio/PortfolioList';
import SearchBar from './SearchBar';
import NewCurrency from './portfolio/NewCurrency';
import NewApi from './portfolio/NewApi';
import PortfolioCards from './portfolio/PortfolioCards';

const Dashboard = () => {
  return (
    <Container className='content'>
      <Container textAlign='right'>
        <NewCurrency />
        <NewApi />
      </Container>
      <SearchBar />
      <PortfolioList />
    </Container>
  );
};

export default Dashboard;
