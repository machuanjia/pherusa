/** @format */

import React, { Component } from 'react'
import { RouteView } from '@components/index'

export default class RouteLayout extends Component {
  
  render() {
    const route = this.props['route']
    return <RouteView routers={route['children']} />
  }
}
