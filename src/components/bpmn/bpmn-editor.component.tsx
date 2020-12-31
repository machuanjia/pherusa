/** @format */

import React, { Component } from 'react'
import { Button, Modal } from 'laiye-antd'
import { MODAL_SIZE } from '@constants/index'
import BpmnBasicComponent from './bpmn/basic.component'
import BpmnEventComponent from './bpmn/event.component'
import BpmnPaletteComponent from './bpmn/palette.component'
import BpmnCustomComponent from './bpmn/custom.component'
import BpmnAnimationComponent from './bpmn/animation.component'

interface IBpmnEditorProps {}
interface IBpmnEditorState {
  isBasicVisible: boolean
  isEventVisible: boolean
  isPaletteVisible: boolean
  isPaletteCustomVisible: boolean
  isAnimationVisible: boolean
}

export default class BpmnEditorComponent extends Component<IBpmnEditorProps, IBpmnEditorState> {
  constructor(props) {
    super(props)
    this.state = {
      isBasicVisible: false,
      isEventVisible: false,
      isPaletteVisible: false,
      isPaletteCustomVisible: false,
      isAnimationVisible: false,
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
      isPaletteVisible: false,
      isPaletteCustomVisible: false,
      isAnimationVisible: false,
    })
  }

  render() {
    const {
      isBasicVisible,
      isEventVisible,
      isPaletteVisible,
      isPaletteCustomVisible,
      isAnimationVisible,
    } = this.state
    return (
      <div>
        <Button type="primary" onClick={this.setOpen.bind(this, 'isBasicVisible')}>
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
        <Button type="primary" className="m-l-12" onClick={this.setOpen.bind(this, 'isEventVisible')}>
          event
        </Button>
        <Modal
          title="Event"
          width={MODAL_SIZE.lg}
          footer={null}
          destroyOnClose={true}
          visible={isEventVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <BpmnEventComponent />
          </div>
        </Modal>
        <Button type="primary" className="m-l-12" onClick={this.setOpen.bind(this, 'isPaletteVisible')}>
          palette
        </Button>
        <Modal
          title="Palette"
          width={MODAL_SIZE.lg}
          footer={null}
          destroyOnClose={true}
          visible={isPaletteVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <BpmnPaletteComponent />
          </div>
        </Modal>
        <Button type="primary" className="m-l-12" onClick={this.setOpen.bind(this, 'isPaletteCustomVisible')}>
          palette custom
        </Button>
        <Modal
          title="Palette Custom"
          width={MODAL_SIZE.lg}
          footer={null}
          destroyOnClose={true}
          visible={isPaletteCustomVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <BpmnCustomComponent />
          </div>
        </Modal>
        <Button type="primary" className="m-l-12" onClick={this.setOpen.bind(this, 'isAnimationVisible')}>
          animation
        </Button>
        <Modal
          title="Palette Custom"
          width={MODAL_SIZE.lg}
          footer={null}
          destroyOnClose={true}
          visible={isAnimationVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <BpmnAnimationComponent />
          </div>
        </Modal>
      </div>
    )
  }
}
