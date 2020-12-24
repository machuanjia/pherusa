/** @format */

import React, { Component } from 'react'
import * as d3 from 'd3'

export default class ChordComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setTimeout(() => {
      this.drawCluster()
    }, 1500)
  }

  drawCluster() {
    console.log(d3['select'])

    var chordGenerator = d3.chord().sortSubgroups(d3.ascending).padAngle(0.04)

    var ribbonGenerator = d3.ribbon().radius(200)

    console.log(ribbonGenerator)

    const data = [
      [10, 20, 30],
      [40, 60, 80],
      [100, 200, 300],
    ]

    var chords = chordGenerator(data)

    console.log(chords)

    const svg = d3.select('#chord').append('svg').attr('width', 1000).attr('height', 1000).style('margin-left', 10)

    // svg.selectAll('path').data(chords).enter().append('path').attr('d', ribbonGenerator)
  }

  render() {
    return <div id="chord">chord</div>
  }
}