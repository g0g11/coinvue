import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import portfolioReducer from './portfolioReducer';
import currencyReducer from './currencyReducer';
import exchangeReducer from './exchangeReducer';

export default combineReducers({
  auth: authReducer,
  portfolio: portfolioReducer,
  currencies: currencyReducer,
  exchanges: exchangeReducer,
  form: reduxForm,
});
