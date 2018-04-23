import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Form, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { show } from 'redux-modal';
import { reduxForm, Field } from 'redux-form';
import { DropdownList } from 'react-widgets';

import {
  submitNewCurrency,
  fetchExchanges,
  fetchCurrencies,
} from '../../actions';

import formFieldsCurrency from './formFieldsCurrency';
import NewCurrencyFormFields from './NewCurrencyFormFields';
import ModalDialog from '../modals/ModalDialog';
import 'react-widgets/dist/css/react-widgets.css';
import * as actions from '../../actions';

class NewCurrencyForm extends Component {
  constructor(props) {
    super(props);
    this.props.fetchExchanges();
    this.props.fetchCurrencies();
  }

  handleOpen = name => () => {
    this.props.show(name, { title: 'Portfolio updated',
      message: 'Currency successful added to your Portfolio.',
    });
  };

  renderFields() {
    return _.map(formFieldsCurrency, ({ label, name }) => {
      return (
        <Field
          key={ name }
          component={ NewCurrencyFormFields }
          type="text"
          label={ label }
          name={ name }
        />
      );
    });
  }

  onSubmit(values) {
    this.props.submitNewCurrency(values);
    // this.props.history.push('/dashboard');
  }

  renderCurrencies({ input, data, valueField, textField }) {
    return (
      <DropdownList {...input}
                    filter
                    data={data}
                    value={ valueField }
                    allowCreate='onFilter'
                    placeholder='Please choose Currency'
                    onChange={input.onChange}
                    textField={textField}
      />
    );
  }

  renderExchanges({ input, data, valueField, textField }) {
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
    const { handleSubmit } = this.props;
    return (
      <Container className='content'>
        <Form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="currency"
            component={ this.renderCurrencies }
            data={ this.props.currencies }
            valueField={ this.props.currencies.fullName }
            textField="fullName"
          />
          <Field
            name="exchange"
            component={ this.renderExchanges }
            data={ this.props.exchanges }
            valueField={ this.props.exchanges.name }
            textField="name"
          />
          { this.renderFields() }
          <Button type='submit' onClick={this.handleOpen('modal')}>Save</Button>
          <ModalDialog />
        </Form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    exchanges: state.exchanges.exchanges,
    currencies: state.currencies.currencies,
  };
}

export default reduxForm({
  form: 'currencyForm',
})(
  connect(mapStateToProps, {
    submitNewCurrency,
    fetchExchanges,
    fetchCurrencies,
    show,
  })(NewCurrencyForm));

