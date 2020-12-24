/** @format */

import React, { Component } from 'react'
import * as d3 from 'd3'
export default class TreeComponent extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.drawTree()
    }, 1500)
  }

  drawTree() {
    console.log(d3['select'])

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
    }
    var root = d3.hierarchy(data)

    var treeLayout = d3.tree()
    treeLayout.size([400, 200])

    treeLayout(root)

    const svg = d3.select('#tree').append('svg').attr('width', 1000).attr('height', 1000).style('margin-left', 10)

    console.log(root.descendants())

    // Nodes
    svg
      .selectAll('circle.node')
      .data(root.descendants())
      .enter()
      .append('circle')
      .classed('node', true)
      .attr('cx', function (d) {
        return d['x']
      })
      .attr('cy', function (d) {
        return d['y']
      })
      .attr('r', 4)

    svg
      .selectAll('line.link')
      .data(root.links())
      .enter()
      .append('line')
      .classed('link', true)
      .attr('x1', function (d) {
        return d.source['x']
      })
      .attr('y1', function (d) {
        return d.source['y']
      })
      .attr('x2', function (d) {
        return d.target['x']
      })
      .attr('y2', function (d) {
        return d.target['y']
      })
      .attr('stroke-width', 1)
      .attr('stroke', 'black')
  }

  render() {
    return <div id="tree">tree</div>
  }
}
