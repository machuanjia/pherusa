/** @format */

import React, { Component } from 'react';
import { RouteView } from '@components/index';
import { withRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return <RouteView />;
  }
}
export default withRouter(App);
