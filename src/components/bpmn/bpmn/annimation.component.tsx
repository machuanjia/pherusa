/** @format */

import React, { Component } from 'react'
import Modeler from 'bpmn-js/lib/Modeler'

import { diagramBpmn } from './diagram.bpmn'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

export default class BpmnAnnimationComponent extends Component {
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
