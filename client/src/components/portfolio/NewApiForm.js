import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Form, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { DropdownList } from 'react-widgets';
import { submitNewApi, fetchExchanges } from '../../actions';

import formFieldsApi from './formFieldsApi';
import NewApiFormFields from './NewApiFormFields';
import 'react-widgets/dist/css/react-widgets.css';

class NewApiForm extends Component {
  constructor(props) {
    super(props);
    this.props.fetchExchanges();
  };

  renderFields() {
    return _.map(formFieldsApi, ({ label, name }) => {
      return (
        <Field
          key={ name }
          component={ NewApiFormFields }
          type="text"
          label={ label }
          name={ name }
        />
      );
    });
  }

  onSubmit(values) {
    this.props.submitNewApi(values);
  }

  renderDropDownList({ input, data, valueField, textField }) {
    return (
      <DropdownList {...input}
                    filter
                    data={data}
                    value={ valueField }
                    allowCreate='onFilter'
                    placeholder='Please choose Exchange'
                    onChange={input.onChange}
                    textField={textField}
      />
    );
  }

  render() {
    console.log(this.props);
    const { handleSubmit } = this.props;
    return (
      <Container className='content'>
        <Form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="exchange"
            component={ this.renderDropDownList }
            data={ this.props.exchanges }
            valueField={ this.props.exchanges.name }
            textField="name"
          />
          { this.renderFields() }
          <Button type='submit'>Save</Button>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { exchanges } = state;
  return exchanges;
}

export default reduxForm({
  form: 'apiForm',
})(
  connect(mapStateToProps, { submitNewApi, fetchExchanges })(NewApiForm)
);
