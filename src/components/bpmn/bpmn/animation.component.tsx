/** @format */

import React, { Component } from 'react'
import Modeler from 'bpmn-js/lib/Modeler'

import { diagramBpmn } from './diagram.bpmn'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

export default class BpmnAnimationComponent extends Component {
  modeler = null

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
      this.addModelerListener()
      var test = document.getElementsByClassName('layer-base')[0]
      console.log(test)
      var group = document.createElement('g')
      group.id = 'animation-group'
      group.innerHTML = `
      <path fill="none" stroke="lightgrey" d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />
          <circle r="5" fill="red">
            <animateMotion
              dur="10s"
              repeatCount="indefinite"
              path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
            />
          </circle>`
      test.appendChild(group)
      // var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      // group.appendChild(svg)
      //   var myCircle = document.createElementNS("http://www.w3.org/2000/svg","circle"); //to create a circle. for rectangle use "rectangle"
      // myCircle.setAttributeNS(null,"id","mycircle");
      // myCircle.setAttributeNS(null,"cx",100);
      // myCircle.setAttributeNS(null,"cy",100);
      // myCircle.setAttributeNS(null,"r",50);
      // myCircle.setAttributeNS(null,"fill","black");
      // myCircle.setAttributeNS(null,"stroke","none");

      // document.getElementById('mySVG').appendChild(myCircle)
      console.log(test)
    }, 1000)
  }

  newBpmnDiagram = () => {
    this.openBpmnDiagram(diagramBpmn)
  }

  openBpmnDiagram = xml => {
    this.modeler.importXML(xml, error => {
      if (error) {
        return console.log('fail import xml')
      }
      const canvas = this.modeler.get('canvas')
      canvas.zoom('fit-viewport')
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
        <div
          id="propview"
          style={{ width: '15%', height: '98vh', float: 'right', maxHeight: '98vh', overflowX: 'auto' }}></div>
        <div id="bpmnview" style={{ width: '85%', height: '98vh', float: 'left' }}>
          {/* <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" stroke="lightgrey" d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />

            <circle r="5" fill="red">
              <animateMotion
                dur="10s"
                repeatCount="indefinite"
                path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
              />
            </circle>
          </svg> */}
        </div>
      </div>
    )
  }
}
