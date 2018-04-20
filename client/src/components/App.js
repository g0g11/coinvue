import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Grid } from 'semantic-ui-react';
import * as actions from '../actions';

import NavigationBar from './NavigationBar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavigationBar />
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
