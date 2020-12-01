/** @format */

import React, { Component } from 'react'
import { isArray, keyBy } from 'lodash'
import styles from './simple-layout.module.less'

export default class SimpleLayoutComponent extends Component {
    render() {
        const { children } = this.props
        if (!isArray(children)) {
            throw new Error('simple layout children must be array, item key must be [desc | graphic | action]')
        }
        const childrenMap = keyBy(children, 'key')
        let desc = null
        let graphic = null
        let action = null
        if (childrenMap['action']) {
            action = <div className={styles['simple-layout-action']}>{childrenMap['action']}</div>
        }
        if (childrenMap['desc']) {
            desc = (
                <div className={styles['simple-layout-desc']}>
                    {childrenMap['desc']}
                    {action}
                </div>
            )
        }
        if (childrenMap['graphic']) {
            graphic = <div className={styles['simple-layout-graphic']}>{childrenMap['graphic']}</div>
        }

        return (
            <div className={styles['simple-layout']}>
                {desc}
                {graphic}
            </div>
        )
    }
}
