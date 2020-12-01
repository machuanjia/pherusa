/** @format */

import React, { Component, Fragment } from 'react'
import { Button, Form, Input } from 'laiye-antd'
import FieldItemComponent from '@components/field/field-item.component'
import { map } from 'lodash'

interface IOperateInfoFormProps {
    isEdit: boolean
    changeState: (state: boolean) => {}
    form: any
}
interface IOperateInfoFormState {
    isEdit: boolean
}

class OperateInfoFormComponent extends Component<IOperateInfoFormProps, IOperateInfoFormState> {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: props.isEdit,
        }
    }

    formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
    }

    buttonItemLayout = {
        wrapperCol: { span: 8, offset: 4 },
    }

    items = [
        {
            label: '名称',
            name: 'name',
            type: 'text',
            rule: { required: true },
            placeholder: '请输入名称',
            value: '南宁快商云软件有限公司',
            isEdit: this.props.isEdit,
        },
        {
            label: '级别',
            name: 'level',
            type: 'text',
            rule: { required: true },
            placeholder: '请输入级别',
            value: '砖石-城市合伙人',
            isEdit: this.props.isEdit,
        },
        {
            label: '联系人',
            name: 'contacts',
            type: 'text',
            rule: { required: true },
            placeholder: '请输入联系人',
            value: '王晓红',
            isEdit: this.props.isEdit,
        },
        {
            label: '联系人手机',
            name: 'contactsPhone',
            type: 'text',
            rule: { required: true, type: 'phone' },
            placeholder: '请输入联系人手机号码',
            value: '13488738829',
            isEdit: this.props.isEdit,
        },
        {
            label: '联系人邮箱',
            name: 'contactsEmail',
            type: 'email',
            rule: { required: true },
            placeholder: '请输入联系人邮箱',
            value: '338748374@qq.com',
            isEdit: this.props.isEdit,
        },
        {
            label: '销售人员',
            name: 'salesman',
            type: 'text',
            placeholder: '请输入销售人员',
            value: '陈德华',
            isEdit: this.props.isEdit,
        },
        {
            label: '销售人员手机',
            type: 'text',
            name: 'salesmanPhone',
            rule: { type: 'phone' },
            placeholder: '请输入销售人员手机',
            value: '13488738821',
            isEdit: this.props.isEdit,
        },
        {
            label: '销售人员邮箱',
            type: 'email',
            name: 'salesmanEmail',
            placeholder: '请输入销售人员邮箱',
            value: '13488738829@qq.com',
            isEdit: this.props.isEdit,
        },
        {
            label: '市场负责人',
            type: 'text',
            name: 'marketLeader',
            placeholder: '请输入市场负责人',
            value: '鹿晗',
            isEdit: this.props.isEdit,
        },
        {
            label: '市场负责人手机',
            name: 'marketLeaderPhone',
            type: 'text',
            rule: { type: 'phone' },
            placeholder: '请输入市场负责人手机号码',
            value: '13488138821',
            isEdit: this.props.isEdit,
        },
        {
            label: '市场负责人邮箱',
            name: 'marketLeaderEmail',
            type: 'email',
            placeholder: '请输入市场负责人邮箱',
            value: '13488738821@qq.com',
            isEdit: this.props.isEdit,
        },
        {
            label: '技术负责人',
            name: 'technicalLeader',
            type: 'text',
            placeholder: '请输入市场负责人',
            value: '鹿晗',
            isEdit: this.props.isEdit,
        },
        {
            label: '技术负责人手机',
            name: 'technicalLeaderPhone',
            type: 'text',
            rule: { type: 'phone' },
            placeholder: '请输入技术负责人手机号码',
            value: '13488138821',
            isEdit: this.props.isEdit,
        },
        {
            label: '技术负责人邮箱',
            name: 'technicalLeaderEmail',
            type: 'email',
            placeholder: '请输入技术负责人邮箱',
            value: '13488738821@qq.com',
            isEdit: this.props.isEdit,
        },
        {
            label: '商务负责人',
            name: 'businessLeader',
            type: 'text',
            placeholder: '请输入商务负责人',
            value: '鹿晗',
            isEdit: this.props.isEdit,
        },
        {
            label: '商务负责人手机',
            name: 'businessLeaderPhone',
            type: 'text',
            rule: { type: 'phone' },
            placeholder: '请输入商务负责人手机号码',
            value: '13488138821',
            isEdit: this.props.isEdit,
        },
        {
            label: '商务负责人邮箱',
            name: 'businessLeaderEmail',
            type: 'email',
            placeholder: '请输入商务负责人邮箱',
            value: '13488738821@qq.com',
            isEdit: this.props.isEdit,
        },
        {
            label: '渠道经理',
            name: 'channelManager',
            type: 'text',
            placeholder: '请输入渠道经理姓名',
            value: '陈德华',
            isEdit: this.props.isEdit,
        },
        {
            label: '渠道经理电话',
            name: 'channelManagerPhone',
            type: 'text',
            rule: { type: 'phone' },
            placeholder: '请输入渠道经理电话',
            value: '13488138821',
            isEdit: this.props.isEdit,
        },
    ]

    componentWillReceiveProps({ isEdit }) {
        map(this.items, n => {
            n.isEdit = isEdit
        })
        this.setState({ isEdit })
    }

    save(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                // this.setState({})
            }
        })
    }

    cancel() {
        this.props.changeState(false)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form {...this.formItemLayout} labelAlign="left" onSubmit={this.save.bind(this)}>
                {this.items.map((n, index) => {
                    return (
                        <FieldItemComponent
                            key={index}
                            name={n.name}
                            type={n.type}
                            label={n.label}
                            rule={n.rule}
                            placeholder={n.placeholder}
                            value={n.value}
                            isEdit={n.isEdit}
                            getFieldDecorator={getFieldDecorator}
                        />
                    )
                })}
                {this.props.isEdit ? (
                    <Form.Item {...this.buttonItemLayout}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                        <Button className="m-l-12" onClick={this.cancel.bind(this)}>
                            取消
                        </Button>
                    </Form.Item>
                ) : (
                    ''
                )}
            </Form>
        )
    }
}
export default Form.create({ name: 'OperateInfo' })(OperateInfoFormComponent) as any
