/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-02-04 15:41:20
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/App.tsx
 * @Description: 
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteView } from '@components/index';

class App extends Component {
  render() {
    return <RouteView />;
  }
}
export default withRouter(App);
