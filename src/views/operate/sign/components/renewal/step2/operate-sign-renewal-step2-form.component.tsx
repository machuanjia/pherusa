/** @format */

import React, { Component } from 'react'
import { Form, Radio, Select, InputNumber, Input } from 'laiye-antd'
import styles from '../../../operate-sign.module.less'
import { map } from 'lodash'
import { PROVINCES } from '@constants/index'

interface IOperateSignRenewalStep2FormProps {
    isEdit: boolean
    changeState: (state: boolean) => {}
    form: any
    getFieldDecorator: any
}
interface IOperateSignRenewalStep2FormState {
    isEdit: boolean
    isSoft: boolean
    isSale: boolean
    isRpa: boolean
}

const CustomSelector = React.forwardRef(
    (
        props: {
            isEdit: boolean
        },
        ref,
    ) => {
        const options = PROVINCES.map(({ name, abbreviation }) => (
            <Select.Option key={name} value={name}>
                {name}
            </Select.Option>
        ))
        const { isEdit } = props
        return (
            <Select disabled={!isEdit} placeholder="请选择省份" style={{ width: 380 }}>
                {options}
            </Select>
        )
    },
)

class OperateSignRenewalStep2FormComponent extends Component<
    IOperateSignRenewalStep2FormProps,
    IOperateSignRenewalStep2FormState
> {
    constructor(props) {
        super(props)
        this.state = {
            isEdit: props.isEdit,
            isSoft: false,
            isSale: false,
            isRpa: false,
        }
    }

    componentWillReceiveProps({ isEdit }) {
        this.setState({ isEdit })
    }

    formItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 8 },
    }

    buttonItemLayout = {
        wrapperCol: { span: 8, offset: 4 },
    }

    changeSoft(soft: HTMLFormElement) {
        this.setState({
            isSoft: soft.target['value'] === 'yes',
        })
    }
    changeSale(soft: HTMLFormElement) {
        this.setState({
            isSale: soft.target['value'] === 'yes',
        })
    }
    changeRpa(soft: HTMLFormElement) {
        this.setState({
            isRpa: soft.target['value'] === 'yes',
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { isSoft, isSale, isRpa, isEdit } = this.state
        const { TextArea } = Input
        return (
            <Form {...this.formItemLayout} labelAlign="left" layout="vertical">
                <div className={styles['renewal-card']}>
                    <div className={styles['renewal-card-header']}>问卷调查</div>
                    <div className={styles['renewal-card-body']}>
                        <Form.Item label="1、您公司优势业务所在区域是哪里？">
                            {getFieldDecorator('region')(<CustomSelector isEdit={isEdit} />)}
                        </Form.Item>

                        <Form.Item label="2、是否有软件开发团队？">
                            {getFieldDecorator('soft')(
                                <Radio.Group disabled={!isEdit} onChange={this.changeSoft.bind(this)}>
                                    <Radio value="yes">是</Radio>
                                    <Radio value="no">否</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        {isSoft ? (
                            <Form.Item>
                                {getFieldDecorator('soft-team')(
                                    <InputNumber
                                        disabled={!isEdit}
                                        style={{ width: 380 }}
                                        placeholder="请输入人数"
                                        min={0}
                                    />,
                                )}
                            </Form.Item>
                        ) : null}

                        <Form.Item label="3、是否有销售团队？">
                            {getFieldDecorator('sale')(
                                <Radio.Group disabled={!isEdit} onChange={this.changeSale.bind(this)}>
                                    <Radio value="yes">是</Radio>
                                    <Radio value="no">否</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        {isSale ? (
                            <Form.Item>
                                {getFieldDecorator('sale-team')(
                                    <InputNumber
                                        disabled={!isEdit}
                                        style={{ width: 380 }}
                                        placeholder="请输入人数"
                                        min={0}
                                    />,
                                )}
                            </Form.Item>
                        ) : null}

                        <Form.Item label="4、您公司有没有接触/使用过/售卖过RPA产品？">
                            {getFieldDecorator('rpa')(
                                <Radio.Group disabled={!isEdit} onChange={this.changeRpa.bind(this)}>
                                    <Radio value="yes">是</Radio>
                                    <Radio value="no">否</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        {isRpa ? (
                            <Form.Item>
                                {getFieldDecorator('rpa-desc')(<TextArea disabled={!isEdit} theme="bright" rows={5} />)}
                            </Form.Item>
                        ) : null}

                        <Form.Item label="5、您是通过什么渠道了解到来也公司的？（合作伙伴来源）">
                            {getFieldDecorator('channel')(
                                <Radio.Group disabled={!isEdit}>
                                    <Radio value="官方网站">官方网站</Radio>
                                    <Radio value="微信公众号/视频号">微信公众号/视频号</Radio>
                                    <Radio value="总分销">总分销</Radio>
                                    <Radio value="政府客户介绍">政府客户介绍</Radio>
                                    <Radio value="企业客户介绍">企业客户介绍</Radio>
                                    <Radio value="市场活动">市场活动</Radio>
                                    <Radio value="同事/朋友介绍">同事/朋友介绍</Radio>
                                    <Radio value="主动搜索 ">主动搜索 </Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                    </div>
                </div>
            </Form>
        )
    }
}

export default Form.create({ name: 'OperateSignRenewalStep2Form' })(OperateSignRenewalStep2FormComponent) as any
