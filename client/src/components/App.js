import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import NavigationBar from './NavigationBar';
import Dashboard from './Dashboard';
import CoinOverview from './CoinOverview';
import ExchangeOverview from './ExchangeOverview';
import NewApiForm from './portfolio/NewApiForm';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
        <NavigationBar />
          <Route exact path='/dashboard' component={ Dashboard } />
          <Route exact path='/overview' component={ CoinOverview } />
          <Route exact path='/exchanges' component={ ExchangeOverview } />
          <Route path='/add-api' component={ NewApiForm } />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
