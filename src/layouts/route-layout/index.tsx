/*
 * @Author: D.Y
 * @Date: 2021-02-04 18:55:58
 * @LastEditTime: 2021-02-04 19:04:08
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/layouts/route-layout/index.tsx
 * @Description: 
 */
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
