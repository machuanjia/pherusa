/** @format */

import { Icon, Modal } from 'laiye-antd'
import React, { Component, Fragment } from 'react'
import styles from './../cytoscape.module.less'
import { data } from './data'
import { CytoscapeGenerator } from './util-cytoscape'
import { Line } from '@ant-design/charts'
import { Slider } from 'laiye-antd'
import { filter, remove, map, isUndefined } from 'lodash'
interface IProdCytoscapeProps {}
interface IProdCytoscapeState {
  nodeDetailVisible: boolean
  edgeDetailVisible: boolean
}

export default class ProdCytoscapeComponent extends Component<IProdCytoscapeProps, IProdCytoscapeState> {
  private cg
  private data

  constructor(props) {
    super(props)
    this.state = {
      nodeDetailVisible: false,
      edgeDetailVisible: false,
    }
    this.data = JSON.parse(data)
  }

  componentDidMount() {
    this.cg = new CytoscapeGenerator({
      container: 'cy',
      nodeTap: this.nodeTap.bind(this),
      edgeTap: this.edgeTap.bind(this),
    })
    this.cg.loadData({
      data: this.data,
      layoutType: CytoscapeGenerator.LAYOUT_DAGRE_LR,
      retain: false,
    })
  }

  componentWillUnmount() {
    this.cg && this.cg.destroy()
  }

  nodeTap(evt) {
    const node = evt.target
    this.setState({
      nodeDetailVisible: true,
      edgeDetailVisible: false,
    })
  }

  edgeTap(edge) {
    this.setState({
      nodeDetailVisible: false,
      edgeDetailVisible: true,
    })
  }

  handleCancel(key) {
    // @ts-ignore
    this.setState({
      [key]: false,
    })
  }

  onAfterChange(value) {
    const rs = filter(this.data, n => {
      return n.data.value && n.data.value > 1000
    })
    const rsIds = map(rs, n => {
      return n.data.id
    })
    const data = filter(this.data, n => {
      //node
      if (!isUndefined(n.data.value)) {
        return n.data.value <= 1000
      }
      //edge
      if (isUndefined(n.data.value)) {
        return !rsIds.includes(n.data.source) && !rsIds.includes(n.data.target)
      }
    })
    this.cg.loadData({
      data,
      layoutType: CytoscapeGenerator.LAYOUT_DAGRE_LR,
      retain: false,
    })
  }

  zoomIn() {
    this.cg.zoomIn()
  }

  zoomOut() {
    this.cg.zoomOut()
  }

  center() {
    this.cg.center()
  }

  exportImg() {
    this.cg.exportPNG('流程挖掘')
  }
  exportPdf() {
    this.cg.exportPDF('流程挖掘')
  }

  getChart() {
    const data = [
      { year: '1991', value1: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ]
    const config = {
      data,
      height: 400,
      xField: 'year',
      yField: 'value',
      point: {
        size: 5,
        shape: 'diamond',
      },
      label: {
        style: {
          fill: '#aaa',
        },
      },
    }
    return <Line {...config} />
  }

  render() {
    const { nodeDetailVisible, edgeDetailVisible } = this.state
    return (
      <Fragment>
        <div className={styles['cytoscape-actions']}>
          <div className={styles['cytoscape-actions-slider']}>
            <Slider defaultValue={100} onAfterChange={this.onAfterChange.bind(this)} />
          </div>
          <div className={styles['cytoscape-actions-buttons']}>
            <Icon className="fs-18 m-r-8" type="zoom-in" onClick={this.zoomIn.bind(this)} />
            <Icon className="fs-18 m-r-8" type="zoom-out" onClick={this.zoomOut.bind(this)} />
            <Icon className="fs-18 m-r-8" type="pic-center" onClick={this.center.bind(this)} />
            <Icon className="fs-18 m-r-8" type="file-image" onClick={this.exportImg.bind(this)} />
            <Icon className="fs-18 m-r-8" type="file-pdf" onClick={this.exportPdf.bind(this)} />
          </div>
        </div>
        <div id="cy" className={styles['cytoscape-wrap']}></div>
        <Modal
          title="Node Detail"
          visible={this.state.nodeDetailVisible}
          destroyOnClose={true}
          footer={null}
          onCancel={this.handleCancel.bind(this, 'nodeDetailVisible')}>
          {this.getChart()}
        </Modal>
        <Modal
          title="Edge Detail"
          destroyOnClose={true}
          footer={null}
          visible={this.state.edgeDetailVisible}
          onCancel={this.handleCancel.bind(this, 'edgeDetailVisible')}>
          {this.getChart()}
        </Modal>
      </Fragment>
    )
  }
}
