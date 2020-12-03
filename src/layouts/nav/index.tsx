/** @format */

import React, { Component } from 'react'
import { Menu } from 'laiye-antd'
import { Link } from 'react-router-dom'
import { filter, map } from 'lodash'
import store from '@stores/store'
import { getAuthRoutes } from '../../permission'
import './nav.less'

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
    this.subRoles = store.subscribe(() => {
      const roles = store.getState().app.roles || []
      if (roles.length > 0) {
        const { rootSubmenuKeys, routers, defaultSelectedKeys, openKeys } = this.getRouters()
        this.setState({ rootSubmenuKeys, openKeys, routers, defaultSelectedKeys })
      }
    })
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
    let appRouter = filter(getAuthRoutes(), n => {
      return !n.meta.isHidden
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
            location.indexOf(cn.path) > -1 && cn.meta && cn.meta.key && defaultSelectedKeys.push(cn.meta.key)
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

  render() {
    const SubMenu = Menu['SubMenu']
    const { openKeys, routers, defaultSelectedKeys } = this.state
    return (
      <Menu
        mode="inline"
        className="nav-main"
        defaultSelectedKeys={defaultSelectedKeys}
        openKeys={openKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 239 }}>
        {routers.map(n => {
          return (
            <SubMenu key={n.meta.key} title={<span>{n.meta.name}</span>}>
              {n.children &&
                n.children.map(item => {
                  let link = <Link to={item.path}>{item.meta.name}</Link>
                  if (item.meta.isLink) {
                    link = (
                      <a href={item.path} target="_blank" rel="noopener noreferrer">
                        {item.meta.name}
                      </a>
                    )
                  }
                  return <Menu.Item key={item.meta.key}>{link}</Menu.Item>
                })}
            </SubMenu>
          )
        })}
      </Menu>
    )
  }
}
