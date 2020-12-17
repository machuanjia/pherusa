/** @format */

import React, { Component } from 'react'
import { Menu } from 'laiye-antd'
import { Link } from 'react-router-dom'
import { filter, map } from 'lodash'
import store from '@stores/store'
import { getAuthRoutes } from '../../permission'
import styles from './nav.module.less'
import { SET_ACTIVE_NAV } from '@stores/app/app-types'

interface IRoute {
  path: string
  meta: { key: string; name: string; isLink?: boolean }
  children?: IRoute[]
}

interface INavProps {}

interface INavState {
  rootSubmenuKeys: string[]
  openKeys: string[]
  routers: IRoute[]
  defaultSelectedKeys: string[]
}

export default class NavComponent extends Component<INavProps, INavState> {
  private subRoles
  constructor(props) {
    super(props)
    this.state = this.getRouters()
  }

  componentWillUnmount() {
    this.subRoles && this.subRoles()
  }

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1)
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys })
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
  }

  getRouters() {
    let appRouter = filter(store.getState().app.routers, n => {
      return !n.meta.isHidden && n.children.length > 0
    })
    const location: string = window.location.href
    const defaultSelectedKeys = []
    const rootSubmenuKeys = []
    const openKeys = []
    const routers =
      appRouter &&
      filter(appRouter, n => {
        if (!n.meta) {
          throw new Error('route must have meta')
        }
        n.meta && n.meta.key && rootSubmenuKeys.push(n.meta.key)
        if (location.indexOf(n.path) > -1 && n.children) {
          n.meta && n.meta.key && openKeys.push(n.meta.key)
          map(n.children, cn => {
            location.indexOf(cn.path) > -1 &&
              cn.meta &&
              cn.meta.key &&
              defaultSelectedKeys.push(cn.meta.key) &&
              store.dispatch({
                type: SET_ACTIVE_NAV,
                activeNav: cn,
              })
          })
        }
        return n.meta.name !== 'notFond'
      })

    return {
      rootSubmenuKeys,
      routers,
      defaultSelectedKeys,
      openKeys,
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
    const { openKeys, routers, defaultSelectedKeys } = this.state
    return (
      <Menu
        mode="inline"
        className={styles['nav-main']}
        defaultSelectedKeys={defaultSelectedKeys}
        openKeys={openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 239 }}>
        {routers.map(n => {
          return (
            <SubMenu key={n.meta.key} title={<span>{n.meta.name}</span>}>
              {n.children &&
                n.children.map(item => {
                  if (!!item.meta['isHidden']) {
                    return null
                  }
                  let link = <Link to={item.path}>{item.meta.name}</Link>
                  if (item.meta.isLink) {
                    link = (
                      <a href={item.path} target="_blank" rel="noopener noreferrer">
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
