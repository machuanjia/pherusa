/** @format */

import React, { Component } from 'react';
import * as d3 from 'd3';

export default class ClusterComponent extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.drawCluster();
    }, 1500);
  }

  drawCluster() {
    console.log(d3.select);

    const data = {
      name: 'A1',
      children: [
        {
          name: 'B1',
          children: [
            {
              name: 'C1',
              value: 100,
            },
            {
              name: 'C2',
              value: 300,
            },
            {
              name: 'C3',
              value: 200,
            },
          ],
        },
        {
          name: 'B2',
          value: 200,
        },
      ],
    };
    const clusterLayout = d3.cluster().size([400, 200]);

    const root = d3.hierarchy(data);

    clusterLayout(root);

    const svg = d3
      .select('#cluster')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 1000)
      .style('margin-left', 10);

    console.log(root.descendants());

    // Nodes
    svg
      .selectAll('circle.node')
      .data(root.descendants())
      .enter()
      .append('circle')
      .classed('node', true)
      .attr('cx', (d: any) => {
        return d.x;
      })
      .attr('cy', (d: any) => {
        return d.y;
      })
      .attr('r', 4);

    svg
      .selectAll('line.link')
      .data(root.links())
      .enter()
      .append('line')
      .classed('link', true)
      .attr('x1', (d: any) => {
        return d.source.x;
      })
      .attr('y1', (d: any) => {
        return d.source.y;
      })
      .attr('x2', (d: any) => {
        return d.target.x;
      })
      .attr('y2', (d: any) => {
        return d.target.y;
      })
      .attr('stroke-width', 1)
      .attr('stroke', 'black');
  }

  render() {
    return <div id="cluster">cluster</div>;
  }
}
