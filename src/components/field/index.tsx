/** @format */

import React, { Component } from 'react'
import { Form, Input, CopyUrl } from 'laiye-antd'

interface IFieldItemProps {
    label: string
    name: string
    type?: string
    rule?: {
        required?: boolean
        message?: string
        type?: string
    }
    placeholder?: string
    value: string
    isEdit?: boolean
    getFieldDecorator: any
}
interface IFieldItemState {
    validator: {}
}

export default class FieldItemComponent extends Component<IFieldItemProps, IFieldItemState> {
    constructor(props) {
        super(props)
        this.state = {
            validator: {
                phone: this.checkPhone.bind(this),
            },
        }
    }

    checkPhone(rule, value, callback) {
        var regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/
        if (value) {
            if (regex.test(value)) {
                callback()
            } else {
                callback('请输入正确的手机号码')
            }
        }
    }

    getField() {
        const { name, rule, type = 'text', placeholder, value, getFieldDecorator } = this.props
        let rules = []
        if (rule) {
            rule.required && rules.push({ required: true, message: rule.message || '请输入正确内容' })
            rule.type &&
                this.state.validator[rule.type] &&
                rules.push({
                    validator: this.state.validator[rule.type],
                })
        }
        return getFieldDecorator(name, { initialValue: value, rules })(<Input type={type} placeholder={placeholder} />)
    }

    render() {
        const { label, isEdit, value } = this.props
        return <Form.Item label={label}>{isEdit ? this.getField() : <CopyUrl width="300px" text={value} />}</Form.Item>
    }
}
