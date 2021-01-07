/** @format */

import React, { Component, Fragment } from 'react';
import { generateRoutes } from './index';
import store from '@stores/store';
import { checkAuth } from './../../permission';
import { withRouter } from 'react-router-dom';

type IRouteViewProps = {
  routers?: Record<string, unknown>[];
};
type IRouteViewState = {
  routers?: Record<string, unknown>[];
};

class RouteViewComponent extends Component<IRouteViewProps, IRouteViewState> {
  private subRoles;
  constructor(props) {
    super(props);
    this.state = {
      routers: store.getState().app.routers,
    };
    this.subRoles = store.subscribe(() => {
      const routers = store.getState().app.routers || [];
      if (routers.length > 0) {
        this.setState({
          routers,
        });
      }
    });
  }

  componentDidMount() {
    !this.props.routers && checkAuth();
  }

  componentWillMount() {}

  componentWillUnmount() {
    this.subRoles && this.subRoles();
  }

  getRoutes() {
    const { routers } = this.props;
    let routes = null;
    if (routers) {
      routes = routers;
    } else {
      routes = this.state.routers;
    }
    return routes;
  }

  render() {
    return <Fragment>{generateRoutes(this.getRoutes())}</Fragment>;
  }
}
export default withRouter(RouteViewComponent);
