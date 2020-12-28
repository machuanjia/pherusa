/** @format */

import React, { Component } from 'react'
import styles from './../cytoscape.module.less'
import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'
cytoscape.use(dagre)

export default class LayoutCytoscapeComponent extends Component {
  private cy

  componentDidMount() {
    this.cy = cytoscape({
      container: document.getElementById('cy'),
      layout: {
        name: 'cose',
        padding: 10,
        randomize: true,
      },
      zoom: 1,
      pan: { x: 0, y: 0 },
      minZoom: 1e-50,
      maxZoom: 1e50,
      zoomingEnabled: true,
      userZoomingEnabled: true,
      panningEnabled: true,
      userPanningEnabled: true,
      wheelSensitivity: 0.01,

      style: cytoscape
        .stylesheet()
        .selector('node')
        .css({
          shape: 'roundrectangle',
          width: 'label',
          height: 'label',
          'background-color': '#79adf8',
          content: 'data(name)',
          'text-wrap': 'wrap',
          'text-valign': 'center',
          'text-max-width': '50px',
          'font-size': 7,
          'text-border-width': 10,
          padding: 5,
        })
        .selector(':selected')
        .css({
          'border-width': 3,
          'border-color': '#333',
        })
        .selector('edge')
        .css({
          'curve-style': 'bezier',
          opacity: 1,
          width: 'mapData(strength, 0, 100, 1, 10)',
          'target-arrow-shape': 'triangle',
          'source-arrow-shape': '',
          color: 'black',
          'line-color': 'gray',
          'source-arrow-color': 'gray',
          'target-arrow-color': 'gray',
          label: 'data(label)',
        })
        .selector('edge.questionable')
        .css({
          'line-style': 'dotted',
          'target-arrow-shape': 'diamond',
        })
        .selector('.faded')
        .css({
          opacity: 0.25,
          'text-opacity': 0,
        }),
      elements: {
        nodes: [],
        edges: [],
      },
    })
    this.loadData()
    this.layout()
  }

  loadData() {
    const str = [
      {
        data: {
          shape: 'roundrectangle',
          color: '#8caebd',
          textsize: '16px',
          borderwidth: '1px',
          oriname: 'Release A',
          name: 'Release A\\n\\n671',
          textcolor: 'black',
          width: '160px',
          id: 0,
          textwidth: '155px',
          height: '70px',
        },
        position: { x: 2546, y: 136 },
      },
      { data: { id: 'n0', name: 'n0' } },
      { data: { id: 'n1', name: 'n1' } },
      { data: { id: 'n2', name: 'n2' } },
      { data: { id: 'n3', name: 'n3' } },
      { data: { source: 'n0', strength: 42.15725806451613, target: 'n1', label: '1' } },
      { data: { source: 'n0', strength: 32.15725806451613, target: 'n2', label: '11' } },
      { data: { source: 'n1', strength: 22.15725806451613, target: 'n2', label: '2' } },
      { data: { source: 'n2', strength: 12.15725806451613, target: 'n3', label: '3' } },
    ]
    this.cy.add(str)
  }

  layout() {
    this.cy
      .elements()
      .layout({
        name: 'dagre',
        avoidOverlap: true,
        edgeSep: 5,
        nodeSep: 100,
        rankSep: 100,
        rankDir: 'LR',
        edgeWeight: function (edge) {
          return 100
        },
      })
      .run()
  }

  componentWillUnmount() {
    this.cy && this.cy.destroy()
  }

  render() {
    return <div id="cy" className={styles['cytoscape-wrap']}></div>
  }
}
