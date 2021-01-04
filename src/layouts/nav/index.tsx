/** @format */

import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { filter, map, find } from 'lodash'
import store from '@stores/store'
import styles from './nav.module.less'
import { SET_ACTIVE_NAV } from '@stores/app/app.types'
import { ROUTE_APP_KEY } from '@routes/index'
import { ICON_MAP } from '@constants/index'

interface IRoute {
  path: string
  meta: { key: string; name: string; isLink?: boolean; redirect?: string; iconType?: string; className?: string }
  children?: IRoute[]
}

interface INavProps {}

interface INavState {
  routers: IRoute[]
}

export default class NavComponent extends Component<INavProps, INavState> {
  private subRoutes
  constructor(props) {
    super(props)
    this.state = this.getRouters()
    this.subRoutes = store.subscribe(() => {
      const routers = store.getState().app.routers || []
      if (routers.length > 0) {
        this.setState(this.getRouters())
      }
    })
  }

  componentWillUnmount() {
    this.subRoutes && this.subRoutes()
  }

  getRouters() {
    const allRoutes = store.getState().app.routers
    const home = find(allRoutes, n => {
      return n.meta.key === ROUTE_APP_KEY
    })
    const routers = filter(home.children, n => {
      return !n.meta.isHidden
    })
    map(routers, router => {
      if (router.children && router.children.length === 1) {
        router.meta.redirect = router.children[0].path
        router.children[0].meta.isHidden = true
      }
    })
    return {
      routers,
    }
  }

  onSelectNav(nav) {
    nav &&
      store.dispatch({
        type: SET_ACTIVE_NAV,
        activeNav: nav,
      })
  }

  render() {
    const SubMenu = Menu['SubMenu']
    const { routers } = this.state
    return (
      <Menu mode="inline" className={styles['nav-main']} theme="dark" inlineCollapsed={true}>
        {routers.map(n => {
          return (
            <SubMenu
              key={n.meta.key}
              title={
                n.meta.redirect ? (
                  <Link to={n.meta.redirect} className={styles['nav-item']}>
                    {n.meta.iconType ? ICON_MAP[n.meta.iconType] : <i className={n.meta.className}></i>}
                    <span>{n.meta.name}</span>
                  </Link>
                ) : (
                  <span>
                    {n.meta.iconType ? ICON_MAP[n.meta.iconType] : <i className={n.meta.className}></i>}
                    <span>{n.meta.name}</span>
                  </span>
                )
              }>
              {n.children &&
                n.children.map(item => {
                  if (!!item.meta['isHidden']) {
                    return null
                  }
                  let link = (
                    <Link to={item.path}>
                      {item.meta.iconType ? ICON_MAP[item.meta.iconType] : <i className={item.meta.className}></i>}
                      {item.meta.name}
                    </Link>
                  )
                  if (item.meta.isLink) {
                    link = (
                      <a href={item.path} target="_blank" rel="noopener noreferrer">
                        {item.meta.iconType ? ICON_MAP[item.meta.iconType] : <i className={item.meta.className}></i>}
                        {item.meta.name}
                      </a>
                    )
                  }
                  return (
                    <Menu.Item key={item.meta.key} onClick={this.onSelectNav.bind(this, item)}>
                      {link}
                    </Menu.Item>
                  )
                })}
            </SubMenu>
          )
        })}
      </Menu>
    )
  }
}
