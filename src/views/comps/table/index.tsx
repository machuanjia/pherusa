/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent } from '@components/index'
import { Table, Divider, Tag, Input, Icon, Button, Tooltip } from 'laiye-antd'

export default class TableView extends Component {
    constructor(props) {
        super(props)
    }
    getRowKey(record) {
        return record.id
    }
    getTable() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '状态',
                key: 'tags',
                dataIndex: 'tags',
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green'
                            if (tag === 'loser') {
                                color = 'volcano'
                            }
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            )
                        })}
                    </span>
                ),
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <span className="m-l-12 m-r-12 icon-action">
                            <Icon type="setting" /> 设置
                        </span>
                        <span className="m-l-12 m-r-12 icon-action">
                            <Tooltip type="bright" placement="top" title="编辑">
                                <Icon type="form" />
                            </Tooltip>
                        </span>
                        <span className="m-l-12 m-r-12 icon-action">
                            <Tooltip type="bright" placement="top" title="删除">
                                <Icon type="delete" />
                            </Tooltip>
                        </span>
                    </span>
                ),
            },
        ]

        const data = [
            {
                id: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
                tags: ['nice', 'developer'],
            },
            {
                id: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
                tags: ['loser'],
            },
            {
                id: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
                tags: ['cool', 'teacher'],
            },
        ]
        return <Table rowKey={this.getRowKey.bind(this)} bordered={true} columns={columns} dataSource={data} />
    }
    render() {
        return (
            <ContentLayoutComponent>
                <Fragment key="left">
                    <Input className="search" suffix={<Icon type="search" />} placeholder="搜索你的文件" />
                </Fragment>
                <Fragment key="actions">
                    <Button type="primary" icon="plus" className={`${'action-btn'}`}>
                        新建
                    </Button>
                </Fragment>
                <Fragment key="main">{this.getTable()}</Fragment>
            </ContentLayoutComponent>
        )
    }
}
