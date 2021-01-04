/** @format */

import React, { Component } from 'react'
import Modeler from 'bpmn-js/lib/Modeler'

import { diagramBpmn } from './diagram.bpmn'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import { map } from 'lodash'
import { appendTo, append, remove, create, innerSVG, on } from 'tiny-svg'

export default class BpmnAnimationComponent extends Component {
  modeler = null
  bpmn
  componentDidMount() {
    setTimeout(() => {
      this.modeler = new Modeler({
        container: '#bpmnview',
        keyboard: {
          bindTo: window,
        },
        propertiesPanel: {
          parent: '#propview',
        },
        additionalModules: [propertiesPanelModule, propertiesProviderModule],
        moddleExtensions: {
          camunda: camundaModdleDescriptor,
        },
      })

      this.newBpmnDiagram()
      // this.addModelerListener()
    }, 1000)
  }

  getPoints() {
    const points = document.getElementsByClassName('djs-hit djs-hit-stroke')
    map(points, ele => {
      const path = ele.getAttribute('points')
      const g = appendTo(create('g'), this.bpmn._viewport)
      const anim = create('animateMotion', {
        dur: '10s',
        fill: 'freeze',
        repeatCount: '0',
        path: `M${path}`,
      })
      on(anim, 'endEvent', e => {
        remove(g)
      })
      append(
        g,
        // @ts-ignore
        anim,
      )

      append(
        g,
        // @ts-ignore
        create('circle', {
          r: '5',
          fill: 'red',
        }),
      )

      const text = create('text', {
        x: '0',
        y: '-7',
        style: 'fill: black; text-anchor: middle;',
      })

      innerSVG(text, 'sss')

      append(
        g,
        // @ts-ignore
        text,
      )
    })
  }

  newBpmnDiagram = () => {
    this.openBpmnDiagram(diagramBpmn)
  }

  openBpmnDiagram = xml => {
    this.bpmn = this.modeler.get('canvas')
    console.log(this.bpmn._viewport)
    // this.getPoints()
    this.modeler.importXML(xml, error => {
      if (error) {
        return console.log('fail import xml')
      }
      this.bpmn = this.modeler.get('canvas')
      this.bpmn.zoom('fit-viewport')
    })
  }

  // addModelerListener() {
  //   // 监听 modeler
  //   const bpmnjs = this.modeler
  //   const that = this
  //   // 'shape.removed', 'connect.end', 'connect.move'
  //   const events = ['shape.added', 'shape.move.end', 'shape.removed']
  //   events.forEach(function (event) {
  //     that.modeler.on(event, e => {
  //       var elementRegistry = bpmnjs.get('elementRegistry')
  //       var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
  //       // console.log(shape)
  //       if (event === 'shape.added') {
  //         console.log('新增了shape')
  //       } else if (event === 'shape.move.end') {
  //         console.log('移动了shape')
  //       } else if (event === 'shape.removed') {
  //         console.log('删除了shape')
  //       }
  //     })
  //   })
  // }

  start() {
    this.getPoints()
    // 清除当前所有动画
    // 获取时间轴时间刻度
    // 添加当前时间刻度到结束时间的数据
  }

  pause() {
    this.bpmn._svg.pauseAnimations()
  }

  continue() {
    this.bpmn._svg.unpauseAnimations()
  }

  render = () => {
    return (
      <div id="bpmncontainer">
        <button onClick={this.start.bind(this)}>开始</button>
        <button onClick={this.pause.bind(this)}>暂停</button>
        <button onClick={this.continue.bind(this)}>继续</button>
        <div
          id="propview"
          style={{ width: '15%', height: '98vh', float: 'right', maxHeight: '98vh', overflowX: 'auto' }}></div>
        <div id="bpmnview" style={{ width: '85%', height: '98vh' }}></div>
      </div>
    )
  }
}
