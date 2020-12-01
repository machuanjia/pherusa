/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent } from '@components/index'
import { Button } from 'laiye-antd'
import OperateInfoFormComponent from './operate-info-form.component'

interface IOperateInfoProps {}
interface IOperateInfoState {
    isEdit: boolean
}

export default class OperateInfoView extends Component<IOperateInfoProps, IOperateInfoState> {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
        }
    }

    setEdit() {
        this.setState({
            isEdit: true,
        })
    }

    save() {
        this.setState({
            isEdit: false,
        })
    }

    cancel() {
        this.setState({
            isEdit: false,
        })
    }

    changeState(state: boolean) {
        this.setState({
            isEdit: state,
        })
    }

    render() {
        const { isEdit } = this.state
        return (
            <ContentLayoutComponent>
                <Fragment key="title">公司信息管理</Fragment>
                <Fragment key="actions">
                    {isEdit ? (
                        ''
                    ) : (
                        <Button type="primary" icon="edit" onClick={this.setEdit.bind(this)}>
                            编辑
                        </Button>
                    )}
                </Fragment>
                <Fragment key="main">
                    <OperateInfoFormComponent isEdit={isEdit} changeState={this.changeState.bind(this)} />
                </Fragment>
            </ContentLayoutComponent>
        )
    }
}
