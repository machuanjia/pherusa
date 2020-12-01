/** @format */

import React, { Component } from 'react'
import { Table, Icon } from 'laiye-antd'
import { getFileIconByName } from '@utils/icon'
import styles from './file.module.less'

interface IFileListProps {}
interface IFileListState {
    scrollY: number
}

export default class FileListComponent extends Component<IFileListProps, IFileListState> {
    constructor(props) {
        super(props)
        this.state = {
            scrollY: document.documentElement.clientHeight - 380,
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this))
    }

    handleResize() {
        this.setState({
            scrollY: document.documentElement.clientHeight - 380,
        })
    }

    downloadAction(file) {}

    removeAction(file) {}

    render() {
        const { Column, ColumnGroup } = Table
        const { scrollY } = this.state
        const columns: any = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, row, index) => (
                    <span className={styles['file-icon']}>
                        <img src={getFileIconByName(row.name)} alt="icon"></img>
                        <span>{row.name}</span>
                    </span>
                ),
            },
            {
                title: '最近更新',
                dataIndex: 'date',
                width: 160,
                key: 'date',
                sorter: (a, b) => a.date - b.date,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: '预览',
                key: 'priview',
                align: 'center',
                width: 120,
                render: (text, row, index) => (
                    <span>
                        <i className="iconfont iconplay icon-primary pointer"></i>
                    </span>
                ),
            },
            {
                title: '下载',
                key: 'download',
                align: 'center',
                width: 120,
                render: (text, row, index) => (
                    <span>
                        <i
                            className="iconfont icondownload icon-primary pointer"
                            onClick={this.downloadAction.bind(this, row)}></i>
                    </span>
                ),
            },
            {
                title: '删除',
                key: 'delete',
                align: 'center',
                width: 120,
                render: (text, row, index) => (
                    <span>
                        <i
                            className="iconfont icondelete icon-primary pointer"
                            onClick={this.removeAction.bind(this, row)}></i>
                    </span>
                ),
            },
        ]

        const dataSource = [
            {
                key: '1',
                name: 'JohnBrown.xls',
                type: 'file',
                date: '2020-12-1',
            },
            {
                key: '2',
                name: 'JimGreen.xlsx',
                type: 'pdf',
                date: '2020-12-2',
            },
            {
                key: '3',
                name: 'JoeBlack.pdf',
                type: 'ppt',
                date: '2020-12-3',
            },
            {
                key: '4',
                name: 'Joe Black',
                type: 'word',
                date: '2020-12-4',
            },
            {
                key: '5',
                name: 'Joe Black',
                type: 'mp4',
                date: '2020-12-5',
            },
            {
                key: '6',
                name: 'Joe Black',
                type: 'img',
                date: '2020-12-6',
            },
            {
                key: '7',
                name: 'JoeBlack.mp4',
                type: 'mp4',
                date: '2020-12-7',
            },
            {
                key: '8',
                name: 'Joe Black',
                type: 'mp4',
                date: '2020-12-8',
            },
            {
                key: '9',
                name: 'Joe Black',
                type: 'mp4',
                date: '2020-12-9',
            },
            {
                key: '10',
                name: 'Joe Black',
                type: 'mp4',
                date: '2020-12-10',
            },
            {
                key: '11',
                name: 'Joe Black',
                type: 'mp4',
                date: '2020-12-11',
            },
            {
                key: '12',
                name: 'Joe Black',
                type: 'mp4',
                date: '2020-12-12',
            },
            {
                key: '13',
                name: 'Joe Black',
                type: 'mp4',
                date: '2020-12-13',
            },
            {
                key: '14',
                name: 'Joe Black',
                type: 'mp4',
                date: '2020-12-14',
            },
            {
                key: '15',
                name: 'Joe Black',
                type: 'mp4',
                date: '2020-12-15',
            },
            {
                key: '16',
                name: 'Joe Black',
                type: 'mp4',
                date: '2020-12-16',
            },
        ]

        return <Table dataSource={dataSource} pagination={false} columns={columns} scroll={{ y: scrollY }}></Table>
    }
}
