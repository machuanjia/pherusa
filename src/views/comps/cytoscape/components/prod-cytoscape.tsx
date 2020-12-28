/** @format */

import React, { Component } from 'react'
import styles from './../cytoscape.module.less'
import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'
import { data } from './data'
import 'tippy.js/dist/tippy.css'
import { CytoscapeGenerator } from './util-cytoscape'
cytoscape.use(dagre)

export default class ProdCytoscapeComponent extends Component {
  private cy

  componentDidMount() {
    this.cy = new CytoscapeGenerator({
      container: 'cy',
    })
    this.cy.loadData({
      data,
      layoutType: CytoscapeGenerator.LAYOUT_DAGRE_LR,
      retain: false,
    })
    // const container = document.getElementById('cy')
    // const options = {
    //   maxZoom: 1e50,
    //   minZoom: 1e-50,
    //   panningEnabled: true,
    //   userPanningEnabled: true,
    //   userZoomingEnabled: true,
    //   wheelSensitivity: 0.1,
    //   zoom: 1,
    //   zoomingEnabled: true,
    // }
    // const style = [
    //   {
    //     selector: 'node',
    //     style: {
    //       'background-color': 'data(color)',
    //       'border-color': 'black',
    //       'border-width': 'data(borderwidth)',
    //       color: 'data(textcolor)',
    //       content: 'data(name)',
    //       'font-size': 'data(textsize)',
    //       height: 'data(height)',
    //       padding: 0,
    //       shape: 'data(shape)',
    //       'text-border-width': 0,
    //       'text-max-width': 'data(textwidth)',
    //       'text-valign': 'center',
    //       'text-wrap': 'wrap',
    //       width: 'data(width)',
    //     },
    //   },
    //   {
    //     selector: 'edge',
    //     style: {
    //       color: 'data(color)',
    //       'control-point-step-size': 60,
    //       'curve-style': 'bezier',
    //       'edge-text-rotation': 0,
    //       'font-size': 16,
    //       label: 'data(label)',
    //       'line-color': 'data(color)',
    //       'line-style': 'data(style)',
    //       'loop-direction': -41,
    //       'loop-sweep': 181,
    //       opacity: 1,
    //       'source-arrow-color': 'data(color)',
    //       'target-arrow-color': 'data(color)',
    //       'target-arrow-shape': 'triangle',
    //       'text-background-color': '#ffffff',
    //       'text-background-opacity': 0,
    //       'text-background-padding': 5,
    //       'text-background-shape': 'roundrectangle',
    //       'text-margin-y': -16,
    //       'text-wrap': 'wrap',
    //       width: 'mapData(strength, 0, 100, 1, 6)',
    //     },
    //   },
    //   {
    //     selector: ':selected',
    //     style: {
    //       'border-color': '#ffa500',
    //       'border-width': '2px',
    //       color: '#ffa500',
    //       'line-color': '#ffa500',
    //       'line-style': 'solid',
    //       'target-arrow-color': '#ffa500',
    //     },
    //   },
    // ]
    // const elements = {
    //   nodes: [],
    //   edges: [],
    // }
    // this.cy = cytoscape(
    //   Object.assign(options, {
    //     container,
    //     style,
    //     elements,
    //   }),
    // )
    // this.loadData()
    // this.layout()
  }

  loadData() {
    this.cy.add(JSON.parse(data))
  }

  layout() {
    this.cy
      .elements()
      .layout({
        avoidOverlap: !0,
        edgeSep: 50,
        name: 'dagre',
        nodeSep: 110,
        randomize: false,
        rankDir: 'LR',
        ranker: 'network-simplex',
      })
      .run()
  }

  componentWillUnmount() {
    this.cy && this.cy.reset()
  }

  render() {
    return <div id="cy" className={styles['cytoscape-wrap']}></div>
  }
}
