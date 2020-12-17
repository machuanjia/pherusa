/** @format */

import React, { Component } from 'react'
import BpmnViewer from 'bpmn-js'
import Modeler from 'bpmn-js/lib/Modeler'
// @ts-ignore
import pizzaDiagram from './pizza-collaboration.bpmn'
import styles from './bpmn.module.less'

export default class BpmnEditorComponent extends Component {
  constructor(props) {
    super(props)
  }

  onShown() {
    console.log('diagram shown')
  }

  onLoading() {
    console.log('diagram loading')
  }

  onError(err) {
    console.log('failed to show diagram')
  }

  componentDidMount() {
    const modeler = new Modeler({
      container: '#canvas',
    })

    console.log(pizzaDiagram)

    modeler
      .importXML(pizzaDiagram)
      .then(result => {
        const { warnings } = result

        console.log('success !', warnings)

        modeler.get('canvas').zoom('fit-viewport')
      })
      .catch(err => {
        const { warnings, message } = err

        console.log('something went wrong:', warnings, message)
      })
  }

  render() {
    return <div id="canvas" className={styles['editor-wrap']}></div>
  }
}
