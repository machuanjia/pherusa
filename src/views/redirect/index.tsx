/** @format */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addRoles } from '@stores/app/app-actions'
import store from '@stores/store'
import styles from './redirect.module.less'
import { Icon, message } from 'laiye-antd'
import { setInfo } from '../../permission'
import { filter, find } from 'lodash'

interface IRedirectProps {
  setRole: (rules) => {}
}

interface IRedirectState {
  loading: boolean
}

class RedirectView extends Component<IRedirectProps, IRedirectState> {
  private subRoles
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }
  async componentDidMount() {
    setInfo().then(() => {
      //  查找权限菜单，并定位到第一个子菜单
      const navs = filter(store.getState().app.routers, n => {
        return n.meta.isHidden !== true && n.children && n.children.length > 0
      })
      if (navs.length > 0) {
        const path = navs[0].children[0].path
        const _children = navs[0].children
        const _os = find(_children, n => {
          return n.meta.key === 'OperateSign'
        })
        this.props['history'].push(_os ? _os.path : path)
        return
      }
      this.props['history'].push('/expired/index')
      message.error('您目前没有内容可以查看，请联系渠道经理!')
    })
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
