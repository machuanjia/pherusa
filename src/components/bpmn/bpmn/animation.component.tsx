/** @format */

import React, { Component } from 'react'
import Modeler from 'bpmn-js/lib/Modeler'

import { diagramBpmn } from './diagram.bpmn'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import { map } from 'lodash'

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
    let str = ''
    console.log(points)
    map(points, ele => {
      const path = ele.getAttribute('points')
      var group = document.createElement("g")
      group.setAttribute("stroke","none")
      group.style.zIndex = "-100"
      group.innerHTML = `<animateMotion dur="10s" fill="freeze" repeatCount="0" path="M${path}">
      </animateMotion>
      <circle r="5" fill="red"></circle>
      <text x="0" y="-7" style="fill: black; text-anchor: middle; visibility: hidden">Case38</text>`
      this.bpmn._viewport.append(group)
 
    })
    console.log(this.bpmn._viewport)
    this.bpmn._viewport.innerHTML = str + this.bpmn._viewport.innerHTML
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
      this.getPoints()
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

  render = () => {
    return (
      <div id="bpmncontainer">
        <div
          id="propview"
          style={{ width: '15%', height: '98vh', float: 'right', maxHeight: '98vh', overflowX: 'auto' }}></div>
        <div id="bpmnview" style={{ width: '85%', height: '98vh' }}></div>
      </div>
    )
  }
}
