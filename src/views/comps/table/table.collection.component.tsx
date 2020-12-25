/** @format */

import React, { Component } from 'react'
import { isPhone } from '@utils/index'
import { Form, Input, Button } from 'laiye-antd'

interface ITableCollectionProps {
  callback: ({ isVisible, isRefresh }) => {}
  form: any
  entity: {}
}
interface ITableCollectionState {
  loading: boolean
}

class TableCollecrtionComponent extends Component<ITableCollectionProps, ITableCollectionState> {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  componentDidMount() {
    console.log(this.props.entity)
  }
  cancel(e) {
    e.preventDefault()
    this.props.callback({
      isVisible: false,
      isRefresh: false,
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.callback({
          isVisible: false,
          isRefresh: true,
        })
      }
    })
  }
  checkPhone(rule, value, callback) {
    isPhone(value) ? callback() : callback('请输入正确的手机号码')
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form labelCol={{ span: 24 }} wrapperCol={{ span: 24 }} onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item label="合作伙伴名称">
          {getFieldDecorator('partnerName', {
            rules: [{ required: true, message: '请输入合作伙伴名称' }],
          })(<Input placeholder="请输入名称" />)}
        </Form.Item>
        <Form.Item label="合作伙伴联系电话">
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入合作伙伴电话' }, { validator: this.checkPhone.bind(this) }],
          })(<Input placeholder="请输入电话" />)}
        </Form.Item>
        <Form.Item label="合作伙伴负责人">
          {getFieldDecorator('partnerAdminName', {
            rules: [{ required: true, message: '请输入合作伙伴负责人' }],
          })(<Input placeholder="请输入合作伙伴负责人" />)}
        </Form.Item>
        <Form.Item label="渠道经理">
          {getFieldDecorator('channelManagerName', {
            rules: [{ required: true, message: '请输入渠道经理' }],
          })(<Input placeholder="请输入渠道经理" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="m-r-12">
            保存
          </Button>
          <Button onClick={this.cancel.bind(this)}>取消</Button>
        </Form.Item>
      </Form>
    )
  }
}
export default Form.create()(TableCollecrtionComponent)
