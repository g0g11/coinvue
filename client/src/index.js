import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import './style/main.css';
import 'semantic-ui-css/semantic.min.css';

import App from './components/App';
import reducers from './reducers';
// import registerServiceWorker from './registerServiceWorker';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.querySelector('#root'));
// registerServiceWorker();
