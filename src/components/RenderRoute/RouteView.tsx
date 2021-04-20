/*
 * @Author: D.Y
 * @Date: 2021-02-07 14:07:03
 * @LastEditTime: 2021-04-20 10:29:18
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/components/RenderRoute/RouteView.tsx
 * @Description:
 */

import React, { Component, Fragment } from 'react'
import { generateRoutes } from './index'
import store from '@stores/store'
import { withRouter } from 'react-router-dom'

type IRouteViewProps = {
  routers?: Record<string, unknown>[]
}
type IRouteViewState = {
  routers?: Record<string, unknown>[]
}

class RouteViewComponent extends Component<IRouteViewProps, IRouteViewState> {
  private subRoles
  constructor(props) {
    super(props)
    this.state = {
      routers: store.getState().app.routers,
    }
    // this.subRoles = store.subscribe(() => {
    //   const routers = store.getState().app.routers || [];
    //   if (this.state.routers !== routers) {
    //     this.setState({
    //       routers,
    //     });
    //   }
    // });
  }

  componentWillMount() {}

  componentWillUnmount() {
    // this.subRoles && this.subRoles();
  }

  getRoutes() {
    const { routers } = this.props
    let routes = null
    if (routers) {
      routes = routers
    } else {
      routes = this.state.routers
    }
    return routes
  }

  render() {
    return <Fragment>{generateRoutes(this.getRoutes())}</Fragment>
  }
}
export default withRouter(RouteViewComponent)
