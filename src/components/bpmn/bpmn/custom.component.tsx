/** @format */

import React, { Component } from 'react'
import Modeler from 'bpmn-js/lib/Modeler'
import { pizzaBpmn } from './pizza.bpmn'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import customModule from './ImportJS/onlyContextPad'
export default class BpmnCustomComponent extends Component {
  constructor(props) {
    super(props)
  }

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
        additionalModules: [customModule],
        moddleExtensions: {
          camunda: camundaModdleDescriptor,
        },
      })

      this.newBpmnDiagram()
    }, 1000)
  }

  newBpmnDiagram = () => {
    this.openBpmnDiagram(pizzaBpmn)
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

  render = () => {
    return (
      <div id="bpmncontainer">
        <div
          id="propview"
          style={{ width: '15%', height: '98vh', float: 'right', maxHeight: '98vh', overflowX: 'auto' }}></div>
        <div id="bpmnview" style={{ width: '85%', height: '98vh', float: 'left' }}></div>
      </div>
    )
  }
}