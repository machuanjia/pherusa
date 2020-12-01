/** @format */

import React, { Component } from 'react'
import OperateSignRenewalStep2FormComponent from './operate-sign-renewal-step2-form.component'

interface IOperateSignRenewalStep2Props {}
interface IOperateSignRenewalStep2State {
    isEdit: boolean
}

export default class OperateSignRenewStep2Component extends Component<
    IOperateSignRenewalStep2Props,
    IOperateSignRenewalStep2State
> {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: true,
        }
    }
    save() {
        console.log('step2 form submit')
    }
    render() {
        const { isEdit } = this.state
        return (
            <div>
                <OperateSignRenewalStep2FormComponent isEdit={isEdit} />
            </div>
        )
    }
}
