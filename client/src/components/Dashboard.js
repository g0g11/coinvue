import React from 'react';
import { Container } from 'semantic-ui-react';

import PortfolioList from './portfolio/PortfolioList';
import NewCurrency from './portfolio/NewCurrency';
import NewApi from './portfolio/NewApi';

const Dashboard = () => {
  return (
    <Container className='content'>
      <Container textAlign='right'>
        <NewCurrency />
        <NewApi />
      </Container>
      <PortfolioList />
    </Container>
  );
};

export default Dashboard;
