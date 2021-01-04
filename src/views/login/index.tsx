/** @format */

import React, { Component } from 'react'
import styles from './login.module.less'
import { Form, Input, Button } from 'antd'
import { ILoginEntity } from '@entities/login'
import { isPhone } from '@utils/validate'
import { connect } from 'react-redux'
import { signIn } from '@apis/users'
import { addToken } from '@stores/app/app.actions'
import { setToken } from '@utils/index'
import { Trans } from 'react-i18next'
import i18n from 'i18next'

interface ILoginProps {
  addToken: (token: string) => {}
}
interface ILoginState {}

class LoginView extends Component<ILoginProps, ILoginState> {
  async loginSuccess(payload: ILoginEntity) {
    const { data } = await signIn(payload)
    setToken('token')
    data && this.props['history'].push('/redirect')
  }

  handleSubmit(values: any) {
    this.loginSuccess(values)
  }

  checkPhone(rule, value, callback) {
    if (isPhone(value)) {
      callback()
    } else {
      callback('请输入正确的手机号码')
    }
  }

  render() {
    return (
      <div className={styles['login-wrap']}>
        <div className={styles['login-aside']}>
          <div className={styles['login-icon']}>
            <a className="form-go-banner" href="/">
              <img className="nav-logo" alt="logo" src="https://cdn.wul.ai/official/img/officialLogo.png" />
            </a>
          </div>
          <img
            className={styles['login-aside-content']}
            alt="login"
            src="https://cdn.wul.ai/official/hestia/login-aside-content.png"
          />
        </div>
        <div className={styles['login-main']}>
          <div className={styles['login-form-wrap']}>
            <div className={styles['login-form-header']}>
              <div className={styles['login-form-title']}>
                <Trans i18nKey="login.title"></Trans>
              </div>
              <div className={styles['login-form-desc']}>
                <Trans i18nKey="login.desc"></Trans>
              </div>
            </div>
            <div className={styles['login-form-body']}>
              <Form onFinish={this.handleSubmit.bind(this)} className={styles['page-form']}>
                <Form.Item name="phone" rules={[{ validator: this.checkPhone.bind(this) }]}>
                  <Input className="xlarge" placeholder={i18n.t('login.desc')} />
                </Form.Item>
                <Form.Item name="captcha" rules={[{ required: true, message: i18n.t('validate.captcha.message') }]}>
                  <div className="flex-r">
                    <div className="flex-1">
                      <Input className="xlarge" type="captcha" placeholder={i18n.t('validate.captcha.placeholder')} />
                    </div>
                    <div className="m-l-12">
                      <Button type="primary" className="xlarge">
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
              还没有注册？ <a href="/">马上注册</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToken: (token: string) => {
      dispatch(addToken(token))
    },
  }
}

const mapStateToProps = (state: any) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
