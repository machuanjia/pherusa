/** @format */

import React, { Component } from 'react';
import * as d3 from 'd3';

export default class PartitionComponent extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.drawPartition();
    }, 1500);
  }

  drawPartition() {
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
    const root = d3.hierarchy(data);
    const partitionLayout = d3.partition();
    partitionLayout.size([400, 200]);
    root.sum((d: any) => {
      return d.value;
    });

    partitionLayout(root);

    const svg = d3
      .select('#partition')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 1000)
      .style('margin-left', 10);

    console.log(root.descendants());

    svg
      .selectAll('rect')
      .data(root.descendants())
      .enter()
      .append('rect')
      .attr('x', (d: any) => {
        return d.x0;
      })
      .attr('y', (d: any) => {
        return d.y0;
      })
      .attr('width', (d: any) => {
        return d.x1 - d.x0;
      })
      .attr('height', (d: any) => {
        return d.y1 - d.y0;
      })
      .attr('style', 'fill: cadetblue; opacity: 0.3; stroke: white;');
  }

  render() {
    return <div id="partition">partition</div>;
  }
}
