/** @format */
import React, { Component } from 'react'
import { ReactShape } from '@antv/x6-react-shape'
import styles from './x6-table.module.less'

export default class X6TableComponent extends Component<{ node?: ReactShape }> {
  shouldComponentUpdate() {
    const node = this.props.node
    if (node) {
      if (node.hasChanged('data')) {
        return true
      }
    }
    return false
  }

  render() {
    return (
      <div className={styles['x6-table']}>
        <div className={styles['x6-table-item']}>test1</div>
        <div className={styles['x6-table-item']}>test2</div>
        <div className={styles['x6-table-item']}>test3</div>
      </div>
    )
  }
}
