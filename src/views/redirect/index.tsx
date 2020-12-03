/** @format */

import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { addRoles } from '@stores/app/app-actions'
import store from '@stores/store'
import { checkAuth } from '../../permission'
import styles from './redirect.module.less'
import { Icon } from 'laiye-antd'

interface IRedirectProps {
  setRole: (rules) => {}
}

interface IRedirectState {
  loading: boolean
}

class RedirectView extends Component<IRedirectProps, IRedirectState> {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
    store.subscribe(() => {
      const roles = store.getState().app.roles || []
      if (roles.length > 0) {
        this.state = {
          loading: false,
        }
        this.props['history'].push('/market/sale')
      } else {
        this.props['history'].push('/login')
      }
    })
  }
  componentDidMount() {
    checkAuth()
  }
  render() {
    return (
      <div className={styles['redirect-wrap']}>
        <div className={styles['redirect-content']}>
          <Icon type="loading" />
          <br />
          <div className={styles['redirect-loading-text']}>Loading</div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setRole: (roles: string[]) => {
      dispatch(addRoles(roles))
    },
  }
}

const mapStateToProps = (state: any) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(RedirectView)
