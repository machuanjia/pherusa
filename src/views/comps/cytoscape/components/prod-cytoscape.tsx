/** @format */

import React, { Component } from 'react'
import styles from './../cytoscape.module.less'
import { data } from './data'
import { CytoscapeGenerator } from './util-cytoscape'

export default class ProdCytoscapeComponent extends Component {
  private cg

  componentDidMount() {
    this.cg = new CytoscapeGenerator({
      container: 'cy',
    })
    this.cg.loadData({
      data,
      layoutType: CytoscapeGenerator.LAYOUT_DAGRE_LR,
      retain: false,
    })
  }

  componentWillUnmount() {
    this.cg && this.cg.destroy()
  }

  render() {
    return <div id="cy" className={styles['cytoscape-wrap']}></div>
  }
}
