/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-04-26 17:32:09
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/layouts/nav/index.tsx
 * @Description:
 */
import React, { Component } from 'react'
import { Menu } from 'laiye-antd'
import { Link } from 'react-router-dom'
import { filter, map, find } from 'lodash'
import i18n from 'i18next'
import { Icon } from 'laiye-pro'
import store from '@stores/store'
import { SET_ACTIVE_NAV } from '@stores/app/app.types'
import { ROUTE_APP_KEY } from '@routes/index'
import styles from './index.module.less'

type IRoute = {
  path: string
  meta: {
    key: string
    name: string
    isLink?: boolean
    redirect?: string
    icon?: string
    className?: string
    isHidden?: boolean
  }
  children?: IRoute[]
}

type INavProps = {
  history: any
}

type INavState = {
  routers: IRoute[]
  selected: string[]
}
const { SubMenu } = Menu
export default class NavComponent extends Component<INavProps, INavState> {
  constructor(props) {
    super(props)
    const allRoutes = store.getState().app.routers
    const home = find(allRoutes, (n) => {
      return n.meta.key === ROUTE_APP_KEY
    })
    const { location } = this.props.history
    const menu = find(store.getState().app.flattenRouters, { path: location.pathname })
    this.state = {
      routers: home.children,
      selected: menu ? [menu.meta.key] : [],
    }
  }

  componentDidMount() {
    // const { history } = this.props
    // history.listen((args) => {
    // })
  }

  onSelectNav(nav) {
    nav &&
      store.dispatch({
        type: SET_ACTIVE_NAV,
        activeNav: nav,
      })
  }

  getMenu(menus) {
    if (menus && menus.length > 0) {
      return menus.map((item) => {
        if (item.meta.isHidden) {
          return null
        }
        if (item.children && item.children.length > 0) {
          return (
            <SubMenu
              key={item.meta.key}
              icon={<Icon className="m-r-8" name={item.meta.icon} />}
              title={item.meta.name}
            >
              {this.getMenu(item.children)}
            </SubMenu>
          )
        }
        return (
          <Menu.Item key={item.meta.key} icon={<Icon className="m-r-8" name={item.meta.icon} />}>
            <Link to={item.path}>
              <span>{item.meta.name}</span>
            </Link>
          </Menu.Item>
        )
      })
    }
    return []
  }

  render() {
    const { routers, selected } = this.state
    return (
      <Menu defaultSelectedKeys={selected} mode="inline" theme="light" inlineCollapsed={true} className={'nav-wrap'}>
        {this.getMenu(routers)}
      </Menu>
    )
  }
}
