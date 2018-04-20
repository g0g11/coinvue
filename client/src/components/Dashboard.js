import React from 'react';
import { Container } from 'semantic-ui-react';

import PortfolioList from './portfolio/PortfolioList';

const Dashboard = () => {
  return (
    <Container className='content'>
      <PortfolioList />
    </Container>
  );
};

export default Dashboard;
