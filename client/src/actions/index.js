import axios from 'axios';
import { FETCH_CURRENCIES,
  FETCH_PORTFOLIO,
  FETCH_USER,
  FETCH_EXCHANGES,
  RECEIVE_CURRENCIES,
  RECEIVE_PORTFOLIO,
  RECEIVE_EXCHANGES,
} from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/auth/user');
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const fetchPortfolio = () => dispatch => {
  dispatch({ type: FETCH_PORTFOLIO });
  return axios.get('/api/wallet/all')
    .then(res => dispatch({
      type: RECEIVE_PORTFOLIO,
      payload: res.data,
    }));
};

export const fetchCurrencies = () => dispatch => {
  dispatch({ type: FETCH_CURRENCIES });
  return axios.get('/api/currency/all')
    .then(res => dispatch({
      type: RECEIVE_CURRENCIES,
      payload: res.data,
    }));
};

export const fetchExchanges = () => dispatch => {
  dispatch({ type: FETCH_EXCHANGES });
  console.log('action');
  return axios.get('/api/exchanges/all')
    .then(res => dispatch({
      type: RECEIVE_EXCHANGES,
      payload: res.data,
    }));
}

export const submitNewApi = (values) => async dispatch => {
  console.log(values);
  const res = await axios.post('/api/wallet/api', values);
  dispatch({ type: FETCH_PORTFOLIO, payload: res.data });
};
