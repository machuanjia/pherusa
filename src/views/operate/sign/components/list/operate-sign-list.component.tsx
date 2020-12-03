/** @format */

import React, { Component } from 'react'
import { Table } from 'laiye-antd'

interface IOperateListProps {
  onRenewal: (entity) => void
}
interface IOperateListState {}

export default class OperateSignListComponent extends Component<IOperateListProps, IOperateListState> {
  constructor(props) {
    super(props)
  }
  renewalAction(record) {
    this.props.onRenewal && this.props.onRenewal(record)
  }
  render() {
    const columns = [
      {
        title: '级别',
        dataIndex: 'level',
        key: 'level',
        render: text => <a>{text}</a>,
      },
      {
        title: '申请类型',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: '本次协议起始日',
        dataIndex: 'start',
        key: 'start',
      },
      {
        title: '本次协议到期日',
        dataIndex: 'end',
        key: 'end',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },

      {
        title: '操作',
        key: 'action',
        render: (text, record) => <a onClick={this.renewalAction.bind(this, record)}>立即续签</a>,
      },
    ]

    const data = [
      {
        key: '1',
        level: '高级合作伙伴',
        category: '新签约',
        start: '2020-09-23',
        end: '2020-09-23',
        status: '审核中',
      },
    ]

    return <Table columns={columns} pagination={false} dataSource={data} />
  }
}
