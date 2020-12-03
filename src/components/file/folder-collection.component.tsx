/** @format */

import { Modal, Input } from 'laiye-antd'
import React, { Component } from 'react'
import { ModalDragComponent } from '@components/index'
import { MODAL_SIZE } from '@constants/index'
import styles from './file.module.less'

interface IFolderCollectionProps {
  visible: boolean
}
interface IFolderCollectionState {
  visible: boolean
  confirmDisabled: boolean
  value: string
}

export default class FolderCollectionComponent extends Component<IFolderCollectionProps, IFolderCollectionState> {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible,
      value: '',
      confirmDisabled: true,
    }
  }
  componentWillReceiveProps({ visible }) {
    this.setState({
      visible,
    })
  }
  save() {
    this.setState({
      visible: false,
    })
  }
  cancel() {
    this.setState({
      visible: false,
    })
  }

  changeValue(event: React.ChangeEvent) {
    this.setState({
      value: event.target['value'],
      confirmDisabled: false,
    })
  }

  render() {
    const { visible, confirmDisabled, value } = this.state
    const title = <ModalDragComponent title="新建文件夹" selector="create-modal" />
    return (
      <Modal
        title={title}
        visible={visible}
        wrapClassName="create-modal"
        width={MODAL_SIZE.xsm}
        onOk={this.save.bind(this)}
        confirmDisabled={confirmDisabled}
        onCancel={this.cancel.bind(this)}>
        <p className={styles['text-divider']}>文件夹名称</p>
        <Input
          type="dark"
          autoFocus
          value={value}
          placeholder="请输入文件夹名称"
          onChange={this.changeValue.bind(this)}
        />
      </Modal>
    )
  }
}
