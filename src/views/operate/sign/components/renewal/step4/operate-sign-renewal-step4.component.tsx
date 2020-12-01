/** @format */

import React, { Component } from 'react'
import OperateSignRenewalStep1FormComponent from '../step1/operate-sign-renewal-step1-form.component'
import OperateSignRenewalStep2FormComponent from '../step2/operate-sign-renewal-step2-form.component'
import { Radio } from 'laiye-antd'

interface IOperateSignRenewalStep4Props {}
interface IOperateSignRenewalStep4State {
    isEdit: boolean
    checked: boolean
}

export default class OperateSignRenewStep4Component extends Component<
    IOperateSignRenewalStep4Props,
    IOperateSignRenewalStep4State
> {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            checked: false,
        }
    }
    save() {
        console.log('step4 form submit')
    }
    render() {
        const { isEdit, checked } = this.state
        return (
            <div>
                <OperateSignRenewalStep1FormComponent isEdit={isEdit} />
                <OperateSignRenewalStep2FormComponent isEdit={isEdit} />
                <p>
                    <Radio checked={checked}>
                        本公司及本人已阅读并同意 来也科技合作伙伴协议 并接受该协议《来也科技合作伙伴协议》
                    </Radio>
                </p>
            </div>
        )
    }
}
