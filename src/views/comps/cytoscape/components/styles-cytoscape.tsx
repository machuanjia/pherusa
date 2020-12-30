/** @format */

import React, { Component } from 'react'
import styles from './../cytoscape.module.less'
import cytoscape from 'cytoscape'
import navigator from 'cytoscape-navigator'
import edgehandles from 'cytoscape-edgehandles'
navigator(cytoscape)
cytoscape.use(edgehandles)

export default class StylesCytoscapeComponent extends Component {
  private cy
  private nav
  private eh

  componentDidMount() {
    this.cy = cytoscape({
      container: document.getElementById('cy'),
      style: [
        {
          selector: 'node',
          style: {
            // 'background-color': '#79adf8',
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
        {
          selector: ':parent',
          css: {
            'text-valign': 'top',
            'text-halign': 'center',
          },
        },

        // style for edge handle
        {
          selector: '.eh-handle',
          style: {
            'background-color': 'red',
            width: 12,
            height: 12,
            shape: 'ellipse',
            'overlay-opacity': 0,
            'border-width': 12, // makes the handle easier to hit
            'border-opacity': 0,
          },
        },

        {
          selector: '.eh-hover',
          style: {
            'background-color': 'red',
          },
        },

        {
          selector: '.eh-source',
          style: {
            'border-width': 2,
            'border-color': 'red',
          },
        },

        {
          selector: '.eh-target',
          style: {
            'border-width': 2,
            'border-color': 'red',
          },
        },

        {
          selector: '.eh-preview, .eh-ghost-edge',
          style: {
            'background-color': 'red',
            'line-color': 'red',
            'target-arrow-color': 'red',
            'source-arrow-color': 'red',
          },
        },

        {
          selector: '.eh-ghost-edge.eh-preview-active',
          style: {
            opacity: 0,
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

    // navigator
    var defaults = {
      container: false, // html dom element
      viewLiveFramerate: 0, // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
      thumbnailEventFramerate: 30, // max thumbnail's updates per second triggered by graph updates
      thumbnailLiveFramerate: false, // max thumbnail's updates per second. Set false to disable
      dblClickDelay: 200, // milliseconds
      removeCustomContainer: true, // destroy the container specified by user on plugin destroy
      rerenderDelay: 100, // ms to throttle rerender updates to the panzoom for performance
    }

    this.nav = this.cy.navigator(defaults) // get navigator instance, nav

    // edge handle
    // the default values of each option are outlined below:
    let defaults_eh = {
      preview: true, // whether to show added edges preview before releasing selection
      hoverDelay: 150, // time spent hovering over a target node before it is considered selected
      handleNodes: 'node', // selector/filter function for whether edges can be made from a given node
      snap: false, // when enabled, the edge can be drawn by just moving close to a target node
      snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
      snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
      noEdgeEventsInDraw: false, // set events:no to edges during draws, prevents mouseouts on compounds
      disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
      handlePosition: function (node) {
        return 'middle top' // sets the position of the handle in the format of "X-AXIS Y-AXIS" such as "left top", "middle top"
      },
      handleInDrawMode: false, // whether to show the handle in draw mode
      edgeType: function (sourceNode, targetNode) {
        // can return 'flat' for flat edges between nodes or 'node' for intermediate node between them
        // returning null/undefined means an edge can't be added between the two nodes
        return 'flat'
      },
      loopAllowed: function (node) {
        // for the specified node, return whether edges from itself to itself are allowed
        return true
      },
      nodeLoopOffset: -50, // offset for edgeType: 'node' loops
      nodeParams: function (sourceNode, targetNode) {
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for intermediary node
        return {}
      },
      edgeParams: function (sourceNode, targetNode, i) {
        // for edges between the specified source and target
        // return element object to be passed to cy.add() for edge
        // NB: i indicates edge index in case of edgeType: 'node'
        return {}
      },
      ghostEdgeParams: function () {
        // return element object to be passed to cy.add() for the ghost edge
        // (default classes are always added for you)
        return {}
      },
      show: function (sourceNode) {
        // fired when handle is shown
      },
      hide: function (sourceNode) {
        // fired when the handle is hidden
      },
      start: function (sourceNode) {
        // fired when edgehandles interaction starts (drag on handle)
      },
      complete: function (sourceNode, targetNode, addedEles) {
        // fired when edgehandles is done and elements are added
      },
      stop: function (sourceNode) {
        // fired when edgehandles interaction is stopped (either complete with added edges or incomplete)
      },
      cancel: function (sourceNode, cancelledTargets) {
        // fired when edgehandles are cancelled (incomplete gesture)
      },
      hoverover: function (sourceNode, targetNode) {
        // fired when a target is hovered
      },
      hoverout: function (sourceNode, targetNode) {
        // fired when a target isn't hovered anymore
      },
      previewon: function (sourceNode, targetNode, previewEles) {
        // fired when preview is shown
      },
      previewoff: function (sourceNode, targetNode, previewEles) {
        // fired when preview is hidden
      },
      drawon: function () {
        // fired when draw mode enabled
      },
      drawoff: function () {
        // fired when draw mode disabled
      },
    }

    this.eh = this.cy.edgehandles(defaults_eh)
    this.eh.enableDrawMode()

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
        'text-valign': 'top',
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
        'text-valign': 'center',
        'text-rotation': '45deg',
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
          label: 'loop',
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
          label: 'autorotate',
          'text-rotation': 'autorotate',
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

    const j = this.cy.$id('n5')
    this.cy.center(j)

    // compound nodes
    this.cy.add([
      { group: 'nodes', data: { id: 'c0', parent: 'p1' }, position: { x: 300, y: 500 } },
      { group: 'nodes', data: { id: 'c1', parent: 'p1' }, position: { x: 400, y: 500 } },
      { group: 'nodes', data: { id: 'p1' } },
      { group: 'edges', data: { id: 'e7', source: 'p1', target: 'n5' } },
    ])

    this.cy.$id('c0').ungrabify()
    this.cy.$id('c1').ungrabify()

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

    // this.cy.navigator({})
  }

  componentWillUnmount() {
    this.cy && this.cy.destroy()
    // this.nav.destroy()
  }

  render() {
    return <div id="cy" className={styles['cytoscape-wrap']}></div>
  }
}
