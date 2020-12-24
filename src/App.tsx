/** @format */

import React, { Component } from 'react'
import { RouteView } from '@components/index'
import { withRouter } from 'react-router-dom'

interface IAppComponentProps {}
interface IAppComponentState {}

class App extends Component<IAppComponentProps, IAppComponentState> {
  render() {
    return <RouteView />
  }
}
export default withRouter(App)
