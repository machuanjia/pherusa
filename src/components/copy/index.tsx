/** @format */

import React, { Component } from 'react'
import { Input, Button, message } from 'laiye-antd'
import ReactDOM from 'react-dom'

export default class CopyComponent extends Component {
  copy() {
    const wrap: any = ReactDOM.findDOMNode(this.refs.copyWrap).firstChild
    if (!wrap.value) {
      return
    }
    wrap.select()
    document.execCommand('copy')
    message.success('复制成功')
  }

  render() {
    return (
      <div className="flex-r m-b-20" ref="copyWrap">
        <Input placeholder="" className="flex-1" />
        <Button className="m-l-12" type="primary" onClick={this.copy.bind(this)}>
          复制邀请码
        </Button>
      </div>
    )
  }
}
