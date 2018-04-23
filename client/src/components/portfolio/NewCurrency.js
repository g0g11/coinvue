import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NewCurrency = () => {
  return (
    <Button content='Add Currency'
            icon='plus circle'
            labelPosition='left'
            as={ Link }
            to='/add-currency' />
  );
};

export default NewCurrency;
