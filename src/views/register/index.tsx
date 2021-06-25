/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-06-25 19:36:19
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/views/register/index.tsx
 * @Description:
 */
import React, { Component } from 'react'
import { Form, Input, Button,message } from 'antd'
import type { ILoginEntity, IUser } from '@interfaces/index'
import i18n from 'i18next'
import { connect } from 'react-redux'
import { Trans } from 'react-i18next'
import { Link } from 'react-router-dom'

import { isPhoneNumber } from 'pherusa-pro'
import { createUser, signIn } from '@apis/users'
import { addToken } from '@stores/app/app.actions'
import { setToken } from '@utils/index'

import styles from './index.module.less'

type IRegisterProps = {
  history: any
  addToken: (token: string) => unknown
}
type ILoginState = unknown

class LoginView extends Component<IRegisterProps, ILoginState> {
  async loginSuccess(payload: IUser) {
    const { data } = await createUser(payload)
    message.success('success!')
    // setToken(data.token)
    data && this.props.history.push('/login')
  }

  handleSubmit(values: any) {
    this.loginSuccess(values)
  }

  checkPhone(rule, value, callback) {
    if (isPhoneNumber(value)) {
      callback()
    } else {
      callback(i18n.t('validate.phone.message'))
    }
  }

  render() {
    return (
      <div className={styles['login-wrap']}>
        <div className={styles['login-aside']}>
          <div className={styles['login-icon']}>
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
                <Form.Item name="username" rules={[{ required:true }]}>
                  <Input className="xlarge" placeholder={i18n.t('login.name')} />
                </Form.Item>
                <Form.Item name="password" rules={[{ required:true }]}>
                  <Input className="xlarge" placeholder={i18n.t('login.password')} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="xlarge" block>
                    <Trans i18nKey="login.registe_now"></Trans>
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className={styles['login-form-footer']}>
              <Trans i18nKey="login.is_registed"></Trans>
              <Link to="/register">
                <Trans i18nKey="login.signin"></Trans>
              </Link>
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

const mapStateToProps = () => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
