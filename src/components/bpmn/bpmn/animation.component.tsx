/** @format */

import React, { Component } from 'react'
import Modeler from 'bpmn-js/lib/Modeler'

import { diagramBpmn } from './diagram.bpmn'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

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
        // propertiesPanel: {
        //   parent: '#propview',
        // },
        // additionalModules: [propertiesPanelModule, propertiesProviderModule],
        moddleExtensions: {
          camunda: camundaModdleDescriptor,
        },
      })

      this.newBpmnDiagram()
      this.addModelerListener()
    }, 1000)
  }

  addAnimation() {
    var elements = this.bpmn._elementRegistry._elements
    elements = Object.values(elements)
    console.log(elements)
    var connections = []
    elements.forEach(ele => {
      if (ele.element.waypoints) {
        connections.push(ele.element.waypoints)
      }
    })
    console.log(connections)

    connections.forEach(d => {
      let path = 'M'
      d.forEach(point => {
        console.log(point)
        path = path + point.x + ',' + point.y + ' '
      })
      console.log(path)
      this.bpmn._svg.innerHTML =
        `<circle r="5" fill="red">
      <animateMotion
        dur="10s"
        repeatCount="0"
        path="` +
        path +
        `"
        />
      </circle>` +
        this.bpmn._svg.innerHTML
    })
    // this.bpmn._svg.innerHTML =
    //   `<circle r="5" fill="red">
    //   <animateMotion
    //     dur="10s"
    //     repeatCount="0"
    //     path="M13.5,1096 206,1216"
    //   />
    // </circle>` + this.bpmn._svg.innerHTML
  }

  newBpmnDiagram = () => {
    this.openBpmnDiagram(diagramBpmn)
  }

  openBpmnDiagram = xml => {
    this.modeler.importXML(xml, error => {
      if (error) {
        return console.log('fail import xml')
      }
      this.bpmn = this.modeler.get('canvas')
      // console.log(this.bpmn)
      // this.bpmn.zoom('fit-viewport')
      this.addAnimation()
      // this.bpmn.zoom('fit-viewport')
    })
  }

  addModelerListener() {
    // 监听 modeler
    const bpmnjs = this.modeler
    const that = this
    // 'shape.removed', 'connect.end', 'connect.move'
    const events = ['shape.added', 'shape.move.end', 'shape.removed']
    events.forEach(function (event) {
      that.modeler.on(event, e => {
        var elementRegistry = bpmnjs.get('elementRegistry')
        var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
        // console.log(shape)
        if (event === 'shape.added') {
          console.log('新增了shape')
        } else if (event === 'shape.move.end') {
          console.log('移动了shape')
        } else if (event === 'shape.removed') {
          console.log('删除了shape')
        }
      })
    })
  }

  render = () => {
    return (
      <div id="bpmncontainer">
        {/* <div
          id="propview"
          style={{ width: '15%', height: '98vh', float: 'right', maxHeight: '98vh', overflowX: 'auto' }}></div> */}
        <div id="bpmnview" style={{ width: '85%', height: '2000px', overflow: 'auto' }}></div>
      </div>
    )
  }
}
