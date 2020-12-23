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
          <div className={styles['login-form-title']}>来也科技登录</div>
          <div className={styles['login-form-desc']}>欢迎访问来也科技专区</div>
        </div>
        <div className={styles['login-form-body']}>
          <Form onSubmit={this.handleSubmit} className={styles['page-form']}>
            <Form.Item>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入正确的手机号' }, { validator: this.checkPhone.bind(this) }],
              })(<Input className="xlarge" placeholder="请输入手机号" />)}
            </Form.Item>
            <Form.Item>
              <div className="flex-r">
                <div className="flex-1">
                  {getFieldDecorator('captcha', {
                    rules: [{ required: true, message: '请输入正确的验证码' }],
                  })(<Input className="xlarge" type="captcha" placeholder="请输入验证码" />)}
                </div>
                <div className="m-l-12">
                  <Button type="dark" className="xlarge">
                    获取验证码
                  </Button>
                </div>
              </div>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="xlarge" block>
                立即登录
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={styles['login-form-footer']}>
          还没有注册？ <a href="">马上注册</a>
        </div>
      </div>
    )
  }
}

export default Form.create({ name: 'login' })(LoginForm) as any
