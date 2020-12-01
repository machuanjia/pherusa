/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent } from '@components/index'
import OperateSignRenewComponent from './components/renewal/operate-sign-renewal.component'
import OperateSignListComponent from './components/list/operate-sign-list.component'

interface IOperateSignProps {}
interface IOperateSignState {
    isEdit: boolean
    entity: any
}

export default class OperateSignView extends Component<IOperateSignProps, IOperateSignState> {
    constructor(props) {
        super(props)
        this.state = {
            entity: null,
            isEdit: false,
        }
    }
    onRenewal(entity) {
        this.setState({
            entity,
            isEdit: true,
        })
    }
    render() {
        const { isEdit, entity } = this.state
        return (
            <ContentLayoutComponent>
                <Fragment key="title">线上签约及续约</Fragment>
                <Fragment key="main">
                    {isEdit ? (
                        <OperateSignRenewComponent entity={entity}></OperateSignRenewComponent>
                    ) : (
                        <OperateSignListComponent onRenewal={this.onRenewal.bind(this)}></OperateSignListComponent>
                    )}
                </Fragment>
            </ContentLayoutComponent>
        )
    }
}
