/** @format */
import { Avatar, Icon, Menu, Popover } from 'laiye-antd'
import React, { Component } from 'react'
import styles from './preference.module.less'
import { logout } from '@utils/index'

export default class PreferenceComponent extends Component {
  constructor(props) {
    super(props)
  }
  menuAction({ key }) {
    if (key === 'logout') {
      logout()
    }
  }
  render() {
    const content = (
      <Menu style={{ width: 200 }} className={`${styles['prefernce-menu']}`} onClick={this.menuAction.bind(this)}>
        <Menu.Item key="log">
          <Icon type="question-circle" /> 更新日志
        </Menu.Item>
        <Menu.Item key="setting">
          <Icon type="setting" /> 个人设置
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" /> 退出
        </Menu.Item>
      </Menu>
    )
    return (
      <div className={styles['preference-wrap']}>
        <Popover placement="rightBottom" title={null} content={content}>
          <Avatar size="large" style={{ backgroundColor: '#79adf8' }} className="pointer" icon="user" />
        </Popover>
      </div>
    )
  }
}
