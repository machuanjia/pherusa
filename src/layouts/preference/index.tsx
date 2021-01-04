/** @format */
import { Avatar, Drawer, Menu, Modal, Popover, Radio } from 'antd'
import React, { Component } from 'react'
import styles from './preference.module.less'
import { logout } from '@utils/index'
import { SketchPicker } from 'react-color'
import { MODAL_SIZE } from '@constants/index'
import i18n from 'i18next'
import { QuestionCircleOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'

export default class PreferenceComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isSettingVisible: false,
      isLogVisible: false,
    }
  }
  menuAction({ key }) {
    if (key === 'log') {
      this.setState({
        isLogVisible: true,
      })
    }
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
  closeLog() {
    this.setState({
      isLogVisible: false,
    })
  }
  changeLang(e) {
    e.preventDefault()
    i18n.changeLanguage(e.target.value)
    window.location.reload()
  }
  themeAction() {}
  render() {
    const content = (
      <Menu style={{ width: 200 }} className={`${styles['prefernce-menu']}`} onClick={this.menuAction.bind(this)}>
        <Menu.Item key="log">
          <QuestionCircleOutlined /> 更新日志
        </Menu.Item>
        <Menu.Item key="setting">
          <SettingOutlined /> 个人设置
        </Menu.Item>
        <Menu.Item key="logout">
          <LogoutOutlined /> 退出
        </Menu.Item>
      </Menu>
    )
    return (
      <div className={styles['preference-wrap']}>
        <Popover placement="rightBottom" title={null} content={content}>
          <Avatar size="large" style={{ backgroundColor: '#79adf8' }} className="pointer" icon="user" />
        </Popover>
        <Modal
          title="更新日志"
          width={MODAL_SIZE.md}
          visible={this.state['isLogVisible']}
          footer={null}
          onCancel={this.closeLog.bind(this)}>
          <p>
            <b>V0.0.1</b>
            <div>本版本包含完整的项目框架结构，你可以稍加改动即可进行业务开发。包含内容如下：</div>
          </p>
          <p>1. http封装（采用axios插件做移除处理）</p>
          <p>2. 国际化（i18next封装处理）</p>
          <p>3. 导航</p>
          <p>4. 布局（app布局和内容页布局）</p>
          <p>5. 样式（变量定义及结构划分）</p>
          <p>6. 状态管理</p>
          <p>7. 路由（路由定义及鉴权逻辑）</p>
          <p>8. 配置（项目配置，webpack配置）</p>
          <p>9. mock数据</p>
          <p>10. 代码风格</p>
          <p>11. 代码检查（使用prettier和eslint）</p>
          <p>12. 代码提交检查（commit-lint）</p>
          <p>
            <a href="https://wiki.laiye.com/display/FE/Pherusa" target="_blank" rel="noopener noreferrer">
              详细文档
            </a>
          </p>
        </Modal>

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
              <Radio.Button value="zh">中文</Radio.Button>
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
