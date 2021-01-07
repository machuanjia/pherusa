/** @format */

import React, { Component } from 'react'
import { X6Editor } from './x6.editor'
import styles from './x6.module.less'
import '@antv/x6-react-shape'
import { X6Nodes } from './x6.nodes'
import X6ToolbarComponent from './x6.toolbar'

export default class X6View extends Component {
  private xe
  private xt
  private data = {
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
  constructor(props) {
    super(props)
    this.state = {
      // @ts-ignore
      xe: this.xe,
    }
  }
  componentDidMount() {
    this.xe = new X6Editor({
      container: 'xe',
      miniMap: 'mm',
    })
    this.xe.loadData(this.data)
    this.xt = new X6Nodes({
      graph: this.xe.graph,
      container: 'tools',
    })
    this.setState({
      xe: this.xe,
    })
  }
  render() {
    return (
      <div className={styles['x6-editor']}>
        <div className={styles['x6-editor-header']}>{this.xe ? <X6ToolbarComponent xe={this.xe} /> : null}</div>
        <div className={styles['x6-editor-body']}>
          <div id="tools" className={styles['x6-editor-body-tools']}></div>
          <div id="xe" className={styles['x6-editor-body-content']}></div>
          <div id="mm" className={styles['x6-editor-body-minimap']}></div>
          <div className={styles['x6-editor-body-property']}></div>
        </div>
      </div>
    )
  }
}
