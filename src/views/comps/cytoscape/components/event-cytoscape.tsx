/** @format */

import React, { Component } from 'react'
import styles from './../cytoscape.module.less'
import cytoscape from 'cytoscape'

export default class EventCytoscapeComponent extends Component {
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

    this.cy.on('add','node',evt=>{
        var node = evt.target
        console.log('added ' + node.id())
    })

    this.cy.on('drag','node',evt=>{
        var node = evt.target
        console.log('dragged ' + node.id())
    })

    this.cy.add([
      { group: 'nodes', data: { id: 'n0' }, position: { x: 300, y: 300 } },
      { group: 'nodes', data: { id: 'n1' }, position: { x: 450, y: 300 } },
    
       {
        group: 'edges',
        data: { id: 'e0', source: 'n0', target: 'n1' },
        style: {
          width: 1,
          'target-arrow-shape': 'triangle',
          'arrow-scale': 2,
          'control-point-distance': '-20 20 -20',
          'control-point-weights': '0.25 0.5 0.75',
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

    this.cy.on('zoom',()=>{
        console.log('zoom')
    })

    // this.cy.zoom({
    //     level: 2.0, // the zoom level
    //     position: { x: 0, y: 0 }
    //   });

    // this.cy.autolock( true );

    this.cy.animate(
      {
        center: 'n1',
        zoom: 2,
      },
      {
        duration: 1000,
      },
    )


    this.cy.startBatch()

    this.cy.$('#n1').data('weight', '70').addClass('funny').removeClass('serious')

    this.cy.endBatch()

    console.log(this.cy.data())

    // 点击node
    this.cy.on('tap', 'node', function (evt) {
      var node = evt.target
      console.log('tapped ' + node.id())
    })

    this.cy.on('position', function (evt) {
        console.log('position changed')
      })




    // this.cy.removeListener('tap');
  }


  componentWillUnmount() {
    this.cy && this.cy.destroy()
  }

  render() {
    return <div id="cy" className={styles['cytoscape-wrap']}></div>
  }
}
