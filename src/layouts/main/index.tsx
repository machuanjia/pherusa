/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-02-04 15:43:18
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/layouts/main/index.tsx
 * @Description: 
 */
import React, { Component } from 'react';
import NavComponent from '../nav';
import styles from './index.module.less';
import { RouteView } from '@components/index';
import PreferenceComponent from '../preference';
import NavbarComponent from '../navbar';

type IMainLayoutProps = {
  route: any;
};

type IMainLayoutState = Record<string, unknown>;

export default class MainLayout extends Component<IMainLayoutProps, IMainLayoutState> {
  componentDidCatch(error, info) {
    // 捕获子组件渲染错误，可以存储在数据库
    console.log(error, info);
  }

  render() {
    const { route } = this.props;
    return (
      <div className={styles['main-layout']}>
        <div className={styles['main-layout-side']}>
          <img
            className="logo"
            alt="logo"
            src="https://cdn.wul.ai/official/img/officialLogo.png"
            width="50"
          />
          <div className="navs">
            <NavComponent />
          </div>
          <PreferenceComponent />
        </div>
        <div className={styles['main-layout-main']}>
          <NavbarComponent />
          <div className={styles['main-layout-main-container']}>
            <RouteView routers={route.children} />
          </div>
        </div>
      </div>
    );
  }
}
