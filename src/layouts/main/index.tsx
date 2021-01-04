/** @format */

import React, { Component } from 'react'
import NavComponent from '../nav'
import styles from './main.module.less'
import { RouteView } from '@components/index'
import PreferenceComponent from '../preference'
import NavbarComponent from '../navbar'


interface IMainLayoutProps {
  route: any
}

interface IMainLayoutState {}

export default class MainLayout extends Component<IMainLayoutState, IMainLayoutProps> {
  componentDidCatch(error, info) {
    // 捕获子组件渲染错误，可以存储在数据库
  }

  render() {
    const route = this.props['route']
    return (
      <div className={styles['main-layout']}>
        <div className={styles['main-layout-side']}>
          <img className="logo" alt="logo" src="https://cdn.wul.ai/official/img/officialLogo.png" width="50" />
          <div className="navs">
            <NavComponent />
          </div>
          <PreferenceComponent />
        </div>
        <div className={styles['main-layout-main']}>
          <NavbarComponent />
          <div className={styles['main-layout-main-container']}>
            <RouteView routers={route['children']} />
          </div>
        </div>
      </div>
    )
  }
}
