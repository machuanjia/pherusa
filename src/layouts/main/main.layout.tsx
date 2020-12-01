/** @format */

import React, { Component } from 'react'
import HeaderComponent from '../header/header.component'
import BannerComponent from '../banner/banner.component'
import NavComponent from '../nav/nav.component'
import styles from './main.module.less'
import { RouteView } from '@components/index'

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
                <HeaderComponent></HeaderComponent>
                <BannerComponent />
                <div className={styles['main-layout-side']}>
                    <NavComponent />
                </div>
                <div className={styles['main-layout-main']}>
                    <RouteView route={route} />
                </div>
            </div>
        )
    }
}
