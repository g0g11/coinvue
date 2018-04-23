import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NewApi = () => {
  return (
    <Button content='Add API'
            icon='plus circle'
            labelPosition='left'
            as={ Link } to='/add-api'
    />
  );
};

export default NewApi;
