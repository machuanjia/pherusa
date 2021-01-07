/** @format */

import React, { Component } from 'react';
import { RouteView } from '@components/index';

type IRouterProps = {
  route: any;
};

type IRouterState = Record<string, unknown>;

export default class RouteLayout extends Component<IRouterProps, IRouterState> {
  render() {
    const { route } = this.props;
    return <RouteView routers={route.children} />;
  }
}
