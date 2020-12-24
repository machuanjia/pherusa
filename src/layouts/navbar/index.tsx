/** @format */

import { Component } from 'react'
import React from 'react'
import styles from './navbar.module.less'
import { withRouter } from 'react-router-dom'
import store from '@stores/store'
import { find } from 'lodash'
import { Icon } from 'laiye-antd'

interface INavbarProps {
  location: {
    pathname: string
  }
}
interface INavbarState {}

class NavbarComponent extends Component<INavbarProps, INavbarState> {
  

  render() {
    const route = find(store.getState().app.flattenRouters, { path: this.props.location.pathname })
    let title = '来也'
    let icon = null
    if (route && route.meta) {
      title = route.meta.name
      icon = route.meta.iconType ? <Icon type={route.meta.iconType} /> : <i className={route.meta.className}></i>
    }

    return (
      <div className={styles['nav-bar-wrap']}>
        <div className={styles['nav-bar-title']}>
          {icon}
          <span className="m-l-12">{title}</span>
        </div>
      </div>
    )
  }
}
export default withRouter(NavbarComponent)
