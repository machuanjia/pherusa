/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent } from '@components/index'
import { Table, Tag, Input, Icon, Button, Tooltip, Modal } from 'laiye-antd'
import { MODAL_SIZE } from '@constants/index'
import TableCollecrtionComponent from './table.collection.component'

interface ITableProps {}

interface ITableState {
    isCollectionVisible: boolean
}

export default class TableView extends Component<ITableProps, ITableState> {
    private searchText = ''

    private pagination = {
        showSizeChanger: true,
        onShowSizeChange: this.onShowSizeChange.bind(this),
        onChange: this.pageChange.bind(this),
        pageSizeOptions: ['10', '20', '30', '40', '50', '60', '100'],
        hideOnSinglePage: false,
        pageIndex: 1,
        pageSize: 20,
        total: 0,
    }

    constructor(props) {
        super(props)
        this.state = {
            isCollectionVisible: false,
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        // 获取数据
    }

    onShowSizeChange(current, pageSize) {
        this.pagination.pageSize = pageSize
        // this.fetchData()
    }
    pageChange(page, pageSize) {
        this.pagination.pageIndex = page
        // this.fetchData()
    }

    searchAction(e) {
        const code = e.keyCode
        const value = e.target.value
        // enter
        if (code === 13) {
            this.searchText = value
            this.pagination.pageIndex = 1
            this.pagination.pageSize = 20
            this.fetchData()
        }
    }

    openCollection() {
        this.setState({
            isCollectionVisible: true,
        })
    }

    callback({ isVisible, isRefresh }) {
        this.setState({
            isCollectionVisible: isVisible,
        })
        isRefresh && this.fetchData()
    }

    cancel() {
        this.setState({
            isCollectionVisible: false,
        })
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
                render: text => text,
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
        return (
            <Table
                rowKey={this.getRowKey.bind(this)}
                pagination={this.pagination}
                bordered={true}
                columns={columns}
                dataSource={data}
            />
        )
    }

    render() {
        const { isCollectionVisible } = this.state
        return (
            <ContentLayoutComponent>
                <Fragment key="left">
                    <Input
                        className="search"
                        onKeyDown={this.searchAction.bind(this)}
                        suffix={<Icon type="search" />}
                        placeholder="搜索你的文件"
                    />
                </Fragment>
                <Fragment key="actions">
                    <Button
                        type="primary"
                        icon="plus"
                        className={`${'action-btn'}`}
                        onClick={this.openCollection.bind(this)}>
                        新建
                    </Button>
                </Fragment>
                <Fragment key="main">
                    {this.getTable()}
                    <Modal
                        title="新建"
                        visible={isCollectionVisible}
                        width={MODAL_SIZE.md}
                        destroyOnClose={true}
                        footer={false}
                        onCancel={this.cancel.bind(this)}>
                        {
                            // @ts-ignore
                            <TableCollecrtionComponent callback={this.callback.bind(this)} />
                        }
                    </Modal>
                </Fragment>
            </ContentLayoutComponent>
        )
    }
}
