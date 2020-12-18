/** @format */

import React, { Component } from 'react'
import styles from './login.module.less'
import LoginForm from './login.form'
import { connect } from 'react-redux'
import { signIn } from '@apis/users'
import { addToken } from '@stores/app/app-actions'
import { ILoginEntity } from '@entities/login'

interface ILoginProps {
  addToken: (token: string) => {}
}
interface ILoginState {}

class LoginView extends Component<ILoginProps, ILoginState> {
  constructor(props) {
    super(props)
  }

  async loginSuccess(payload: ILoginEntity) {
    const { data } = await signIn(payload)
    data && this.props['history'].push('/redirect')
  }

  render() {
    return (
      <div className={styles['login-wrap']}>
        <div className={styles['login-aside']}>
          <div className={styles['login-icon']}>
            <a className="form-go-banner" href="/">
              <img className="nav-logo" src="https://cdn.wul.ai/official/img/officialLogo.png" />
            </a>
          </div>
          <img
            className={styles['login-aside-content']}
            src="https://cdn.wul.ai/official/hestia/login-aside-content.png"
          />
        </div>
        <div className={styles['login-main']}>
          <LoginForm loginSuccess={this.loginSuccess.bind(this)} />
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
