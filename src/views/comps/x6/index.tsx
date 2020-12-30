/** @format */

import React, { Component } from 'react'
import { X6Editor } from './util.x6'
import styles from './x6.module.less'

export default class X6View extends Component {
  private xe
  private refMiniMapContainer
  componentDidMount() {
    this.xe = new X6Editor({
      container: 'xe',
      miniMap:'mm'
    })
    const data = {
      // 节点
      nodes: [
        {
          id: 'node1', // String，可选，节点的唯一标识
          x: 40, // Number，必选，节点位置的 x 值
          y: 40, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: 'hello', // String，节点标签
        },
        {
          id: 'node2', // String，节点的唯一标识
          x: 160, // Number，必选，节点位置的 x 值
          y: 180, // Number，必选，节点位置的 y 值
          width: 80, // Number，可选，节点大小的 width 值
          height: 40, // Number，可选，节点大小的 height 值
          label: 'world', // String，节点标签
        },
      ],
      // 边
      edges: [
        {
          source: 'node1', // String，必须，起始节点 id
          target: 'node2', // String，必须，目标节点 id
        },
      ],
    }
    this.xe.loadData(data)
  }
  render() {
    return (
      <div className={styles['x6-editor']}>
        <div className={styles['x6-editor-header']}></div>
        <div className={styles['x6-editor-body']}>
          <div className={styles['x6-editor-body-tools']}></div>
          <div id="xe" className={styles['x6-editor-body-content']}></div>
          <div id="mm" className={styles['x6-editor-body-minimap']}></div>
          <div className={styles['x6-editor-body-property']}></div>
        </div>
      </div>
    )
  }
}
