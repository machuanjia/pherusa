/** @format */

import React, { Component, useState, useEffect } from 'react'
import GridLayout from 'react-grid-layout'
import { Line, Bar, Pie, DualAxes } from '@ant-design/charts'

export default class DashboardView extends Component {
  render() {
    const data = [
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ]
    const config = {
      data,
      height: 400,
      xField: 'year',
      yField: 'value',
      point: {
        size: 5,
        shape: 'diamond',
      },
    }

    const data_bar = [
      {
        type: '分类一',
        values: [76, 100],
      },
      {
        type: '分类二',
        values: [56, 108],
      },
      {
        type: '分类三',
        values: [38, 129],
      },
      {
        type: '分类四',
        values: [58, 155],
      },
      {
        type: '分类五',
        values: [45, 120],
      },
      {
        type: '分类六',
        values: [23, 99],
      },
      {
        type: '分类七',
        values: [18, 56],
      },
      {
        type: '分类八',
        values: [18, 34],
      },
    ]
    const config_bar = {
      data: data_bar.reverse(),
      xField: 'values',
      yField: 'type',
      isRange: true,
      // label: {
      //   position: 'midddle',
      //   layout: [{ type: 'adjust-color' }],
      // },
    }

    const data_pie = [
      {
        type: '分类一',
        value: 27,
      },
      {
        type: '分类二',
        value: 25,
      },
      {
        type: '分类三',
        value: 18,
      },
      {
        type: '分类四',
        value: 15,
      },
      {
        type: '分类五',
        value: 10,
      },
      {
        type: '其他',
        value: 5,
      },
    ]
    const config_pie = {
      appendPadding: 10,
      data: data_pie,
      angleField: 'value',
      colorField: 'type',
      radius: 0.9,
      label: {
        type: 'inner',
        offset: '-30%',
        content: function content(_ref: { percent: string }) {
          var percent = parseFloat(_ref.percent)
          return percent * 100 + '%'
        },
        style: {
          fontSize: 12,
          textAlign: 'center',
        },
      },
      interactions: [{ type: 'element-active' }],
    }

    var data_dual = [
      {
        time: '2019-03',
        value: 350,
        count: 800,
      },
      {
        time: '2019-04',
        value: 900,
        count: 600,
      },
      {
        time: '2019-05',
        value: 300,
        count: 400,
      },
      {
        time: '2019-06',
        value: 450,
        count: 380,
      },
      {
        time: '2019-07',
        value: 470,
        count: 220,
      },
    ]
    var config_dual = {
      data: [data_dual, data_dual],
      xField: 'time',
      yField: ['value', 'count'],
      geometryOptions: [
        { geometry: 'column' },
        {
          geometry: 'line',
          lineStyle: { lineWidth: 2 },
        },
      ],
    }

    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: 'a', x: 0, y: 0, w: 4, h: 3 },
      { i: 'b', x: 4, y: 0, w: 8, h: 3 },
      { i: 'c', x: 8, y: 4, w: 4, h: 3 },
      { i: 'd', x: 0, y: 4, w: 8, h: 3 },
    ]
    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={100} width={1200}>
        <div key="a">
          <Line {...config} />
        </div>
        <div key="b">
          <Bar {...config_bar} />
        </div>
        <div key="c">
          <Pie {...config_pie} />
        </div>
        <div key="d">
          <DualAxes {...config_dual} />
        </div>
      </GridLayout>
    )
  }
}
