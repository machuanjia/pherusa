/** @format */

import React, { Component } from 'react'
import styles from './../cytoscape.module.less'
import cytoscape from 'cytoscape'

export default class StylesCytoscapeComponent extends Component {
  private cy

  componentDidMount() {
    this.cy = cytoscape({
      container: document.getElementById('cy'),
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#79adf8',
            content: 'data(id)',
            shape: 'ellipse',
          },
        },
        {
          selector: 'edge',
          style: {
            width: 1,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'unbundled-bezier',
          },
        },
      ],
      elements: {
        nodes: [],
        edges: [],
      },
      layout: {
        name: 'grid',
      },
      zoom: 1,
      pan: { x: 200, y: 0 },

      // interaction options:
      minZoom: 1,
      maxZoom: 2,
      zoomingEnabled: true,
      userZoomingEnabled: true,
      panningEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: true,
      selectionType: 'single',
      touchTapThreshold: 8,
      desktopTapThreshold: 4,
      autolock: false,
      autoungrabify: false,
      autounselectify: false,
    })

    this.cy.add({
      group: 'nodes',
      data: { weight: 75, id: 'n6' },
      position: { x: 300, y: 100 },
      style: {
        shape: 'rectangle',
        'background-color': 'blue',
        'background-opacity': '0.5',
        label: 'top left',
        'text-halign': 'left',
        'text-valign':'top'
      },
    })

    this.cy.add({
      group: 'nodes',
      data: { weight: 75, id: 'n7' },
      position: { x: 400, y: 100 },
      style: {
        shape: 'ellipse',
        'background-fill': 'linear-gradient',
        'background-opacity': '0.3',
        'background-gradient-stop-colors': 'cyan magenta yellow',
        'background-gradient-stop-positions': '0,50%,100%',
        label: 'center',
        'text-halign': 'center',
        'text-valign':'center',
        'text-rotation':'45deg'
      },
    })

    this.cy.add({
      group: 'nodes',
      data: { weight: 75, id: 'n8' },
      position: { x: 500, y: 100 },
      style: {
        shape: 'triangle',
        'border-width': '1',
        'border-style': 'dotted',
        label: 'bottom right',
        'text-halign': 'right',
        'text-valign': 'bottom',
      },
    })

    this.cy.add([
      { group: 'nodes', data: { id: 'n0' }, position: { x: 300, y: 200 }, style: { shape: 'rectangle' } },
      { group: 'nodes', data: { id: 'n1' }, position: { x: 450, y: 200 }, style: { shape: 'round-diamond' } },
      {
        group: 'edges',
        data: { id: 'e0', source: 'n0', target: 'n0' },
        style: {
          width: 1,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'loop-direction': '90deg',
          'label':'loop',
        },
      },
      {
        group: 'edges',
        data: { id: 'e1', source: 'n1', target: 'n1' },
        style: {
          width: 1,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'loop-direction': '-90deg',
        },
      },
    ])

    this.cy.add([
      { group: 'nodes', data: { id: 'n2' }, position: { x: 300, y: 300 } },
      { group: 'nodes', data: { id: 'n3' }, position: { x: 450, y: 300 } },
      {
        group: 'edges',
        data: { id: 'e2', source: 'n2', target: 'n3' },
        style: {
          width: 1,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle-tee',
          'label': 'autorotate',
          'text-rotation': 'autorotate'
          // 'curve-style': 'unbundled-bezier',
        },
      },
      {
        group: 'edges',
        data: { id: 'e4', source: 'n2', target: 'n3' },
        style: {
          width: 1,
          'line-color': 'red',
          'target-arrow-color': 'red',
          'target-arrow-shape': 'triangle',
          'control-point-distance': '-20 20 -20',
          // 'curve-style': 'unbundled-bezier',
        },
      },
      {
        group: 'edges',
        data: { id: 'e5', source: 'n2', target: 'n3' },
        style: {
          width: 1,
          'line-color': 'blue',
          'target-arrow-color': 'blue',
          'target-arrow-shape': 'triangle',
          'arrow-scale': 2,
          'control-point-distance': '-20 20 -20',
          'control-point-weights': '0.25 0.5 0.75',
        },
      },
    ])

    this.cy.add([
      { group: 'nodes', data: { id: 'n4' }, position: { x: 300, y: 400 } },
      { group: 'nodes', data: { id: 'n5' }, position: { x: 600, y: 400 } },
      {
        group: 'edges',
        data: { id: 'e3', source: 'n4', target: 'n5' },
        style: {
          width: 1,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'circle-triangle',
          'line-style': 'dashed',
          'line-dash-pattern': [6, 3],
          //   'curve-style': 'straight',
        },
      },
      {
        group: 'edges',
        data: { id: 'e6', source: 'n4', target: 'n5' },
        style: {
          width: 1,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle-cross',
          'line-style': 'dotted',
          'control-point-distance': '-20 20 -20',
          'target-endpoint': '200deg',
          //   'curve-style': 'straight',
        },
      },
    ])

    const j = this.cy.$id('n1')
    this.cy.center(j)

    // this.cy.remove('node#n0');

    // const dd = this.cy.elements('[weight > 50]');

    // const ff = this.cy.filter(function (element, i) {
    //   return element.isNode() && element.data('weight') > 50
    // })

    // console.log(ff)

    // this.cy.fit()

    // this.cy.zoom({
    //     level: 1.0, // the zoom level
    //     position: { x: 0, y: 0 }
    //   });

    // this.cy.autolock( true );

    // this.cy.animate(
    //   {
    //     pan: { x: 100, y: 100 },
    //     zoom: 2,
    //   },
    //   {
    //     duration: 1000,
    //   },
    // )

    this.cy.startBatch()

    this.cy.$('#n1').data('weight', '70').addClass('funny').removeClass('serious')

    this.cy.endBatch()

    console.log(this.cy.data())

    // 点击node
    this.cy.on('tap', 'node', function (evt) {
      var node = evt.target
      console.log('tapped ' + node.id())
    })

    this.cy.on('tap', event => {
      // target holds a reference to the originator
      // of the event (core or element)
      var evtTarget = event.target
      if (evtTarget === this.cy) {
        console.log('tap on background')
      } else {
        console.log('tap on some element')
      }
    })
  }

  componentWillUnmount() {
    this.cy && this.cy.destroy()
  }

  render() {
    return <div id="cy" className={styles['cytoscape-wrap']}></div>
  }
}
