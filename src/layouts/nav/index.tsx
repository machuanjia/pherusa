/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-04-21 17:25:02
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/layouts/nav/index.tsx
 * @Description: 
 */
import React, { Component } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { filter, map, find } from 'lodash';
import i18n from 'i18next';
import store from '@stores/store';
import { SET_ACTIVE_NAV } from '@stores/app/app.types';
import { ROUTE_APP_KEY } from '@routes/index';
import { ICON_MAP } from '@constants/index';
import styles from './index.module.less';

type IRoute = {
  path: string;
  meta: {
    key: string;
    name: string;
    isLink?: boolean;
    redirect?: string;
    iconType?: string;
    className?: string;
    isHidden?: boolean;
  };
  children?: IRoute[];
};

type INavProps = Record<string, unknown>;

type INavState = {
  routers: IRoute[];
};

export default class NavComponent extends Component<INavProps, INavState> {
  private subRoutes;
  constructor(props) {
    super(props);
    this.state = this.getRouters();
    this.subRoutes = store.subscribe(() => {
      const routers = store.getState().app.routers || [];
      if (this.state.routers !== routers) {
        this.setState(this.getRouters());
      }
    });
  }


  componentDidMount(){
    const {history} = this.props
    // @ts-ignore
    history.listen((...args)=>{
      console.log(args)
    })
  }

  componentWillUnmount() {
    this.subRoutes && this.subRoutes();
  }

  getRouters() {
    const allRoutes = store.getState().app.routers;
    const home = find(allRoutes, (n) => {
      return n.meta.key === ROUTE_APP_KEY;
    });
    const routers = filter(home.children, (n) => {
      return !n.meta.isHidden;
    });
    map(routers, (router) => {
      const rt = router;
      if (rt.children && rt.children.length === 1) {
        rt.meta.redirect = rt.children[0].path;
        rt.children[0].meta.isHidden = true;
      }
    });
    return {
      routers,
    };
  }

  onSelectNav(nav) {
    nav &&
      store.dispatch({
        type: SET_ACTIVE_NAV,
        activeNav: nav,
      });
  }

  render() {
    const { SubMenu } = Menu;
    const { routers } = this.state;

    // 如果有children的话才SubMenu、否则就是Menu.Item
    return (
      <Menu mode="inline" className={styles['nav-main']} inlineCollapsed={true}>
        {routers.map((n) => {
          return n.children ?  (
            <SubMenu
              key={n.meta.key}
              title={
                n.meta.redirect ? (
                  <Link to={n.meta.redirect} className={styles['nav-item']}>
                    {n.meta.iconType ? (
                      ICON_MAP[n.meta.iconType]
                    ) : (
                      <i className={n.meta.className}></i>
                    )}
                    <span>{i18n.t(n.meta.name)}</span>
                  </Link>
                ) : (
                  <span>
                    {n.meta.iconType ? (
                      ICON_MAP[n.meta.iconType]
                    ) : (
                      <i className={n.meta.className}></i>
                    )}
                    <span>{i18n.t(n.meta.name)}</span>
                  </span>
                )
              }
            >
              {
                n.children.map((item) => {
                  if (item.meta.isHidden) {
                    return null;
                  }
                  let link = (
                    <Link to={item.path}>
                      {item.meta.iconType ? (
                        ICON_MAP[item.meta.iconType]
                      ) : (
                        <i className={item.meta.className}></i>
                      )}
                      {i18n.t(item.meta.name)}
                    </Link>
                  );
                  if (item.meta.isLink) {
                    link = (
                      <a href={item.path} target="_blank" rel="noopener noreferrer">
                        {item.meta.iconType ? (
                          ICON_MAP[item.meta.iconType]
                        ) : (
                          <i className={item.meta.className}></i>
                        )}
                        {i18n.t(item.meta.name)}
                      </a>
                    );
                  }
                  return (
                    <Menu.Item key={item.meta.key} onClick={this.onSelectNav.bind(this, item)}>
                      {link}
                    </Menu.Item>
                  );
                })}
            </SubMenu>
          ) : (
            <Menu.Item key={n.path}>
              <Link to={n.path}>
                {ICON_MAP[n.meta.iconType]}
                <span>{n.meta.name}</span>
              </Link>
          </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}
