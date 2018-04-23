import React from 'react';
import { Form } from 'semantic-ui-react';

export default ({ input, label, meta: { error, touched } }) => {
  return (
    <Form.Input {...input}  fluid label={ label }
                placeholder={ label }
    />
  );
};
