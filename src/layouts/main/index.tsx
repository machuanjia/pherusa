/** @format */

import React, { Component } from 'react'
import HeaderComponent from '../header'
import BannerComponent from '../banner'
import NavComponent from '../nav'
import styles from './main.module.less'
import { RouteView } from '@components/index'
import { Icon } from 'laiye-antd'
import PreferenceComponent from '../preference'
import { renderRoutes } from 'react-router-config'

interface IMainLayoutProps {
  route: any
}

interface IMainLayoutState {}

export default class MainLayout extends Component<IMainLayoutState, IMainLayoutProps> {
  constructor(props) {
    super(props)
  }

  componentDidCatch(error, info) {
    // 捕获子组件渲染错误，可以存储在数据库
  }

  render() {
    const route = this.props['route']
    return (
      <div className={styles['main-layout']}>
        {/* <HeaderComponent></HeaderComponent> */}
        <div className={styles['main-layout-side']}>
          <img className="logo" src="https://cdn.wul.ai/official/img/officialLogo.png" width="50" />
          <div className="navs">
            <NavComponent />
          </div>
          <PreferenceComponent />
        </div>
        <div className={styles['main-layout-main']}>
          <RouteView routers={route['children']} />
        </div>
      </div>
    )
  }
}
