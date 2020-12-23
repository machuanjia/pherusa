/** @format */

import React, { Component } from 'react'
import { Button, Modal } from 'laiye-antd'
import { MODAL_SIZE } from '@constants/index'
import BpmnBasicComponent from './bpmn/basic.component'
import BpmnEventComponent from './bpmn/event.component'

interface IBpmnEditorProps {}
interface IBpmnEditorState {
  isBasicVisible: boolean
  isEventVisible: boolean
}

export default class BpmnEditorComponent extends Component<IBpmnEditorProps, IBpmnEditorState> {
  constructor(props) {
    super(props)
    this.state = {
      isBasicVisible: false,
      isEventVisible: false,
    }
  }
  setOpen(key) {
    // @ts-ignore
    this.setState({
      [key]: true,
    })
  }

  handleCancel() {
    this.setState({
      isBasicVisible: false,
      isEventVisible: false,
    })
  }

  render() {
    const { isBasicVisible, isEventVisible } = this.state
    return (
      <div>
        <Button type="primary" onClick={this.setOpen.bind(this,'isBasicVisible')}>
          basic
        </Button>
        <Modal
          title="Basic"
          width={MODAL_SIZE.lg}
          footer={null}
          destroyOnClose={true}
          visible={isBasicVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <BpmnBasicComponent />
          </div>
        </Modal>
        <Button type="primary" className="m-l-12" onClick={this.setOpen.bind(this,'isEventVisible')}>
          event
        </Button>
        <Modal
          title="Basic"
          width={MODAL_SIZE.lg}
          footer={null}
          destroyOnClose={true}
          visible={isEventVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <BpmnEventComponent />
          </div>
        </Modal>
      </div>
    )
  }
}
