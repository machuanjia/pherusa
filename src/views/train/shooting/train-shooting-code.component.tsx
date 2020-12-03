/** @format */

import React, { Component } from 'react'
import { ModalDragComponent } from '@components/index'
import { Modal } from 'laiye-antd'
import { MODAL_SIZE } from '@constants/index'
import { CopyComponent } from '@components/index'

interface ITrainShootingCodeProps {
  visible: boolean
}
interface ITrainShootingCodeState {
  visible: boolean
  first: string
  second: string
  third: string
}

export default class TrainShootingCodeComponent extends Component<ITrainShootingCodeProps, ITrainShootingCodeState> {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      first: '',
      second: '',
      third: '',
    }
  }

  componentWillReceiveProps({ visible }) {
    this.setState({
      visible,
    })
  }

  cancel() {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { visible, first, second, third } = this.state
    const title = <ModalDragComponent title="训练码" selector="shooting-modal" />
    return (
      <Modal
        title={title}
        width={MODAL_SIZE.sm}
        visible={visible}
        wrapClassName="shooting-modal"
        destroyOnClose={true}
        footer={null}
        onCancel={this.cancel.bind(this)}>
        <p className="modal-title">复制下方训练码，即可开始训练</p>
        <p className="modal-desc">
          您每天可以申请3个训练码。每个训练码可以使用两个小时，时间结束后，训练码即作废，需要重新申请。
        </p>
        <CopyComponent></CopyComponent>
        <CopyComponent></CopyComponent>
        <CopyComponent></CopyComponent>
      </Modal>
    )
  }
}
