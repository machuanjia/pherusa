/** @format */

import { MODAL_SIZE } from '@constants/index'
import { Button, Modal } from 'laiye-antd'
import React, { Component } from 'react'
import TreeComponent from './components/tree.component'

interface IGraphLayoutProps {}
interface IGraphLayoutState {
  isTreeVisible: boolean
}

export default class GraphLayoutView extends Component<IGraphLayoutProps, IGraphLayoutState> {
  constructor(props) {
    super(props)
    this.state = {
      isTreeVisible: false,
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
      isTreeVisible: false,
    })
  }
  render() {
    const { isTreeVisible } = this.state
    return (
      <div>
        <Button type="primary" onClick={this.setOpen.bind(this, 'isTreeVisible')}>
          tree
        </Button>
        <Modal
          title="Tree"
          width={MODAL_SIZE.lg}
          footer={null}
          destroyOnClose={true}
          visible={isTreeVisible}
          onCancel={this.handleCancel.bind(this)}>
          <div style={{ height: '800px', overflow: 'auto' }}>
            <TreeComponent />
          </div>
        </Modal>
      </div>
    )
  }
}
