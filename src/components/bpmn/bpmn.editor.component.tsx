/** @format */

import React, { Component } from 'react'
import BpmnViewer from 'bpmn-js'
import Modeler from 'bpmn-js/lib/Modeler'

import { pizzaBpmn } from '@assets/pizza.bpmn'
import propertiesPanelModule from 'bpmn-js-properties-panel'
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'

// @ts-ignore
// import pizzaDiagram from './pizza-collaboration.bpmn'
import styles from './bpmn.module.less'

export default class BpmnEditorComponent extends Component {
  constructor(props) {
    super(props)
  }

  // onShown() {
  //   console.log('diagram shown')
  // }

  // onLoading() {
  //   console.log('diagram loading')
  // }

  // onError(err) {
  //   console.log('failed to show diagram')
  // }

  modeler = null

  componentDidMount() {
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

    // console.log(pizzaDiagram)

    // modeler
    //   .importXML(pizzaDiagram)
    //   .then(result => {
    //     const { warnings } = result

    //     console.log('success !', warnings)

    //     modeler.get('canvas').zoom('fit-viewport')
    //   })
    //   .catch(err => {
    //     const { warnings, message } = err

    //     console.log('something went wrong:', warnings, message)
    //   })
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
    // .then(function(){

    //   // diagram is loaded, add interaction to it

    //   // Option 1:
    //   // directly hook into internal diagram events
    //   // this allows you to access the clicked element directly

    //   var eventBus = this.modeler.get('eventBus');

    //   // you may hook into any of the following events
    //   var events = [
    //     'element.hover',
    //     'element.out',
    //     'element.click',
    //     'element.dblclick',
    //     'element.mousedown',
    //     'element.mouseup'
    //   ];

    //   events.forEach(function(event) {

    //     eventBus.on(event, function(e) {
    //       // e.element = the model element
    //       // e.gfx = the graphical element

    //       console.log(event, 'on', e.element.id);
    //     });
    //   });
    // });
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

  // render() {
  //   return <div id="canvas" className={styles['editor-wrap']}></div>
  // }
}
