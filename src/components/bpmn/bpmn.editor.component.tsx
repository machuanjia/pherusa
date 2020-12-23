/** @format */

import React, { Component } from 'react'
import { Button, Modal } from 'laiye-antd'
import { MODAL_SIZE } from '@constants/index'
import BpmnBasicComponent from './bpmn/basic.component'

interface IBpmnEditorProps {}
interface IBpmnEditorState {
  isBasicVisible: boolean
}

export default class BpmnEditorComponent extends Component<IBpmnEditorProps, IBpmnEditorState> {
  constructor(props) {
    super(props)
    this.state = {
      isBasicVisible: false,
    }
  }
  basicOpen() {
    this.setState({
      isBasicVisible: true,
    })
  }

  handleCancel() {
    this.setState({
      isBasicVisible: false,
    })
  }

  render() {
    const { isBasicVisible } = this.state
    return (
      <div>
        <Button type="primary" onClick={this.basicOpen.bind(this)}>
          basic
        </Button>
        <Modal
          title="Basic"
          width={MODAL_SIZE.lg}
          footer={null}
          visible={isBasicVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <BpmnBasicComponent />
          </div>
        </Modal>
      </div>
    )
  }
}
