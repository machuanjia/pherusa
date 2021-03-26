/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-03-26 11:55:24
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/layouts/navbar/index.tsx
 * @Description: 
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import i18n from 'i18next';
import { find } from 'lodash';

import store from '@stores/store';
import { ICON_MAP } from '@constants/index';

import styles from './index.module.less';

type INavbarProps = {
  location: {
    pathname: string;
  };
};
type INavbarState = Record<string, unknown>;

class NavbarComponent extends Component<INavbarProps, INavbarState> {
  render() {
    const route = find(store.getState().app.flattenRouters, { path: this.props.location.pathname });

    let title = '来也';
    let icon = null;
    if (route && route.meta) {
      title = i18n.t(route.meta.name);

      icon = route.meta.iconType ? (
        ICON_MAP[route.meta.iconType]
      ) : (
        <i className={route.meta.className}></i>
      );
    }

    return (
      <div className={styles['nav-bar-wrap']}>
        <div className={styles['nav-bar-title']}>
          {icon}
          <span className="m-l-12">{title}</span>
        </div>
      </div>
    );
  }
}
export default withRouter(NavbarComponent);


