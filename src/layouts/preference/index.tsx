/** @format */
import { Avatar, Drawer, Icon, Menu, Popover, Radio } from 'laiye-antd'
import React, { Component } from 'react'
import styles from './preference.module.less'
import { logout } from '@utils/index'
import { SketchPicker } from 'react-color'

export default class PreferenceComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSettingVisible: false,
    }
  }
  menuAction({ key }) {
    if (key === 'setting') {
      this.setState({
        isSettingVisible: true,
      })
    }
    if (key === 'logout') {
      logout()
    }
  }
  closeSetting() {
    this.setState({
      isSettingVisible: false,
    })
  }
  changeLang(e) {
    e.preventDefault()
    const lang = e.target.value
  }
  themeAction() {}
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
        <Drawer
          // @ts-ignore
          title="偏好设置"
          placement="right"
          closable={false}
          onClose={this.closeSetting.bind(this)}
          visible={this.state['isSettingVisible']}>
          <div className="text-dark m-b-8">语言</div>
          <div className="m-b-24">
            <Radio.Group onChange={this.changeLang.bind(this)} defaultValue="zh-cn">
              <Radio.Button value="zh-cn">中文</Radio.Button>
              <Radio.Button value="en">英文</Radio.Button>
              <Radio.Button value="ZH">繁体</Radio.Button>
            </Radio.Group>
          </div>
          <div className="text-dark m-b-8">部件大小</div>
          <div className="m-b-24">
            <Radio.Group onChange={this.changeLang.bind(this)} defaultValue="zh-cn">
              <Radio.Button value="zh-cn">大</Radio.Button>
              <Radio.Button value="en">中</Radio.Button>
              <Radio.Button value="ZH">小</Radio.Button>
            </Radio.Group>
          </div>
          <div className="text-dark m-b-8">主题</div>
          <div className="m-b-24">
            <Popover
              overlayClassName="preference-pop-wrap"
              placement="bottom"
              title={null}
              content={<SketchPicker />}
              trigger="click">
              <div className="preference-theme-block"></div>
            </Popover>
          </div>
        </Drawer>
      </div>
    )
  }
}
