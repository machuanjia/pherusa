/** @format */

import { Component } from 'react'
import React from 'react'
import { isArray, keyBy } from 'lodash'
import HeaderComponent from './header/header.component'
import styles from './main.scope.less'

interface IMainLayoutProps {}

interface IMainLayoutState {}

export default class MainLayout extends Component<IMainLayoutState, IMainLayoutProps> {
    render() {
        const { children } = this.props
        if (!isArray(children)) {
            throw new Error('main layout children must be array, item key must be [left | center | right]')
        }
        const childrenMap = keyBy(children, 'key')
        return (
            <div className={styles['main-layout']}>
                <HeaderComponent></HeaderComponent>
                <div>{childrenMap['left']}</div>
                <div>{childrenMap['center']}</div>
                <div>{childrenMap['right']}</div>
            </div>
        )
    }
}
