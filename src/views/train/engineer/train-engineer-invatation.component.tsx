/** @format */

import React, { Component } from 'react'
import { ModalDragComponent } from '@components/index'
import { Modal } from 'laiye-antd'
import { MODAL_SIZE } from '@constants/index'
import { CopyComponent } from '@components/index'

interface ITrainEngineerInvationProps {
    visible: boolean
}
interface ITrainEngineerInvationState {
    visible: boolean
    code: string
}

export default class TrainEngineerInvationComponent extends Component<
    ITrainEngineerInvationProps,
    ITrainEngineerInvationState
> {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            code: '',
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
        const { visible } = this.state
        const title = <ModalDragComponent title="邀请码" selector="code-modal" />
        return (
            <Modal
                title={title}
                width={MODAL_SIZE.sm}
                visible={visible}
                wrapClassName="code-modal"
                destroyOnClose={true}
                footer={null}
                onCancel={this.cancel.bind(this)}>
                <p className="modal-title">复制下方邀请码，即可参加高级认证</p>
                <p className="modal-desc">
                    高级认证仅向来也科技合作伙伴开放，您需要提前申请邀请码，才能有资格参加高级认证。
                </p>
                <CopyComponent></CopyComponent>
            </Modal>
        )
    }
}
