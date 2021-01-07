/** @format */

import React, { Component } from 'react'
import { isArray, keyBy } from 'lodash'
import styles from './content-layout.module.less'

export default class ContentLayoutComponent extends Component {
  render() {
    const { children } = this.props
    if (!isArray(children)) {
      throw new Error('content layout children must be array, item key must be [title | actions | bread | main]')
    }
    const childrenMap = keyBy(children, 'key')
    let title = null
    let actions = null
    const bread = null
    let main = null
    if (childrenMap.left) {
      title = <div className={styles['content-layout-header-left']}>{childrenMap.left}</div>
    }
    if (childrenMap.actions) {
      actions = <div className={styles['content-layout-header-actions']}>{childrenMap.actions}</div>
    }
    if (childrenMap.main) {
      main = <div className={styles['content-layout-main']}>{childrenMap.main}</div>
    }
    return (
      <div className={styles['content-layout']}>
        <div className={styles['content-layout-header']}>
          {title}
          <div className={styles['content-layout-header-center']}></div>
          {actions}
        </div>
        {bread}
        {main}
      </div>
    )
  }
}
