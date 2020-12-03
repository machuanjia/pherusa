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
    let bread = null
    let main = null
    if (childrenMap['title']) {
      title = <div className={styles['content-layout-header-title']}>{childrenMap['title']}</div>
    }
    if (childrenMap['actions']) {
      actions = <div className={styles['content-layout-header-actions']}>{childrenMap['actions']}</div>
    }
    if (childrenMap['bread']) {
      bread = <div className={styles['content-layout-bread']}>{childrenMap['bread']}</div>
    }
    if (childrenMap['main']) {
      main = <div className={styles['content-layout-main']}>{childrenMap['main']}</div>
    }
    return (
      <div className={styles['content-layout']}>
        <div className={styles['content-layout-header']}>
          {title}
          {actions}
        </div>
        {bread}
        {main}
      </div>
    )
  }
}
