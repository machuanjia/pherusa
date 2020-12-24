/** @format */

import React, { Component } from 'react'
import * as d3 from 'd3'

export default class PackComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setTimeout(() => {
      this.drawPack()
    }, 1500)
  }

  drawPack() {
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

    var packLayout = d3.pack()
    packLayout.size([300, 300])
    // packLayout.padding(10)
    root.sum(function (d) {
      return d['value']
    })

    packLayout(root)

    const svg = d3.select('#pack').append('svg').attr('width', 1000).attr('height', 1000).style('margin-left', 10)

    console.log(root.descendants())

    svg
      .selectAll('circle')
      .data(root.descendants())
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return d['x']
      })
      .attr('cy', function (d) {
        return d['y']
      })
      .attr('r', function (d) {
        return d['r']
      })
      .attr('style', 'fill: cadetblue; opacity: 0.3; stroke: white;')
  }

  render() {
    return <div id="pack">pack</div>
  }
}
