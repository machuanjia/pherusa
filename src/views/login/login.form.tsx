/** @format */

import React, { Component } from 'react'
import styles from './login.module.less'
import { Form, Input, Button, Row, Col } from 'laiye-antd'
import { ILoginEntity } from '@entities/login'
import { isPhone } from '@utils/validate'

interface ILoginFormProps {
  loginSuccess: (payload: ILoginEntity) => {}
  form: any
}

interface ILoginFormState {}

class LoginForm extends Component<ILoginFormProps, ILoginFormState> {
  constructor(props) {
    super(props)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values: ILoginEntity) => {
      if (!err) {
        this.props.loginSuccess && this.props.loginSuccess(values)
      }
    })
  }

  checkPhone(rule, value, callback) {
      if (isPhone(value)) {
        callback()
      } else {
        callback('请输入正确的手机号码')
      }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles['login-form-wrap']}>
        <div className={styles['login-form-header']}>
          <div className={styles['login-form-title']}>合作伙伴登录</div>
          <div className={styles['login-form-desc']}>欢迎访问来也科技合作伙伴专区</div>
        </div>
        <div className={styles['login-form-body']}>
          <Form onSubmit={this.handleSubmit} className="page-form">
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入正确的手机号' }, { validator: this.checkPhone.bind(this) }],
              })(<Input className="xlarge" placeholder="请输入手机号" />)}
            </Form.Item>
            <Form.Item>
              <Row gutter={8}>
                <Col span={18}>
                  {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: '请输入正确的验证码' }],
                  })(<Input className="xlarge" type="captcha" placeholder="请输入验证码" />)}
                </Col>
                <Col span={6}>
                  <Button type="dark" className="xlarge">
                    获取验证码
                  </Button>
                </Col>
              </Row>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="xlarge" block>
                立即登录
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles['login-form-footer']}>
          还不是合作伙伴？ <a href="">申请成为合作伙伴</a>
        </div>
      </div>
    )
  }
}

export default Form.create({ name: 'login' })(LoginForm) as any
