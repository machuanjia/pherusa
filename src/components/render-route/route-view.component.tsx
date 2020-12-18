/** @format */

import React, { Component, Fragment } from 'react'
import { generateRoutes } from './index'
import store from '@stores/store'
import { checkAuth } from './../../permission'
import { withRouter } from 'react-router-dom'

interface IRouteViewProps {
  routers?: {}[]
}
interface IRouteViewState {
  routers?: {}[]
}

class RouteViewComponent extends Component<IRouteViewProps, IRouteViewState> {
  private subRoles
  constructor(props) {
    super(props)
    this.state = {
      routers: store.getState().app.routers,
    }
    this.subRoles = store.subscribe(() => {
      const routers = store.getState().app.routers || []
      if (routers.length > 0) {
        this.setState({
          routers,
        })
      }
    })
  }

  componentDidMount() {
    checkAuth()
  }

  componentWillMount() {}

  componentWillUnmount() {
    this.subRoles && this.subRoles()
  }

  getRoutes() {
    const routers = this.props['routers']
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
