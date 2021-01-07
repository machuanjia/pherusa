/** @format */

import React, { Component } from 'react';
import styles from './../cytoscape.module.less';
import cytoscape from 'cytoscape';

export default class BasicCytoscapeComponent extends Component {
  private cy;

  componentDidMount() {
    this.cy = cytoscape({
      container: document.getElementById('cy'),
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#79adf8',
            content: 'data(id)',
          },
        },
        {
          selector: 'edge',
          style: {
            width: 1,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
          },
        },
      ],
      elements: {
        nodes: [{ data: { id: 'a' } }, { data: { id: 'b' } }],
        edges: [{ data: { id: 'ab', source: 'a', target: 'b' } }],
      },
      layout: {
        name: 'grid',
      },
      zoom: 1,
      pan: { x: 0, y: 0 },

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
    });

    // this.cy.add({
    //   group: 'nodes',
    //   data: { weight: 75 },
    //   position: { x: 200, y: 200 },
    // })
    this.cy.add([
      { group: 'nodes', data: { id: 'n0', weight: 100 }, position: { x: 100, y: 100 } },
      { group: 'nodes', data: { id: 'n1', cus: 'cus' }, position: { x: 200, y: 200 } },
      { group: 'edges', data: { id: 'e0', source: 'n0', target: 'n1' } },
    ]);

    // const j = this.cy.$id('n1');
    // this.cy.center( j );

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

    this.cy.animate(
      {
        pan: { x: 100, y: 100 },
        zoom: 2,
      },
      {
        duration: 1000,
      },
    );

    this.cy.startBatch();

    this.cy.$('#n1').data('weight', '70').addClass('funny').removeClass('serious');

    this.cy.endBatch();

    console.log(this.cy.data());

    // 点击node
    this.cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      console.log(`tapped ${node.id()}`);
    });

    this.cy.on('tap', (event) => {
      // target holds a reference to the originator
      // of the event (core or element)
      const evtTarget = event.target;
      if (evtTarget === this.cy) {
        console.log('tap on background');
      } else {
        console.log('tap on some element');
      }
    });
  }

  componentWillUnmount() {
    this.cy && this.cy.destroy();
  }

  render() {
    return <div id="cy" className={styles['cytoscape-wrap']}></div>;
  }
}
