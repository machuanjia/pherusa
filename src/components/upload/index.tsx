/** @format */

import React, { Component, Fragment } from 'react'
import { Upload, message, Button, Icon, Modal, Table } from 'laiye-antd'
import { ModalDragComponent } from '@components/index'
import styles from './upload.module.less'
import { getFileIconByName } from '@utils/index'
import { map, filter } from 'lodash'
import { FILE_STATUS_MAP } from '@constants/index'
import { getFileSize } from '@utils/index'
import { MODAL_SIZE } from '@constants/index'
import { IFile } from '@entities/file'
import { UPLOAD_POP_STATUS } from './upload.constant'

interface IUploadProps {}
interface IUploadState {
    isVisible: boolean
    width: number
    popStatus: {}
    file: IFile
    fileList: IFile[]
}

export default class UploadComponent extends Component<IUploadProps, IUploadState> {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
            width: MODAL_SIZE.md,
            popStatus: UPLOAD_POP_STATUS.DEFAULT,
            file: null,
            fileList: [],
        }
    }
    uploadChange(info) {
        this.setState({
            file: info.file,
            fileList: info.fileList,
        })
        if (info.file.status === 'uploading') {
            this.setState({
                isVisible: true,
            })
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 上传成功`)
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败.`)
        }
    }
    save() {}
    cancel() {
        this.setState({
            isVisible: false,
        })
    }
    minAction() {
        this.setState({
            popStatus: UPLOAD_POP_STATUS.MIN,
        })
        const _width = document.documentElement.clientWidth
        const _height = document.documentElement.clientHeight
        const _modal: any = document.getElementsByClassName('upload-modal')[0]
        const _h = _modal.getElementsByClassName('ant-modal-content')[0].clientHeight
        _modal.style.transform = `translate(${(_width - this.state.width) / 2}px, ${(_height - _h) / 2}px)`
    }
    maxAction() {
        this.setState({
            popStatus: UPLOAD_POP_STATUS.DEFAULT,
        })
    }
    getModelTitle() {
        const { popStatus } = this.state
        const min = <i className="iconfont iconmodal-min icon-primary pointer" onClick={this.minAction.bind(this)}></i>
        const max = (
            <i className="iconfont iconmodal-max icon-primary pointer m-l-12" onClick={this.maxAction.bind(this)}></i>
        )
        const titleWrap = (
            <div className={styles['upload-header']}>
                <div className={styles['upload-header-title']}>上传文件</div>
                <div className={styles['upload-header-actions']}>
                    {popStatus === UPLOAD_POP_STATUS.DEFAULT ? min : max}
                    <i
                        className="iconfont iconmodal-close icon-primary pointer m-l-12"
                        onClick={this.cancel.bind(this)}></i>
                </div>
            </div>
        )
        return <ModalDragComponent title={titleWrap} selector="upload-modal" />
    }
    beforeUpload(file) {
        if (file.size / 1024 / 1024 > 10) {
            message.error(`${file.name} 太大了，不要超过10M哦。`)
            return false
        }
        return true
    }
    getModalProps() {
        return {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            showUploadList: false,
            onChange: this.uploadChange.bind(this),
            beforeUpload: this.beforeUpload.bind(this),
            accept: '.doc,.docx,.xlsx,.xls,.ppt,.pptx,.mp4,.png,.jpg',
        }
    }
    getFileName(text, row, index) {
        return (
            <div className={styles['file-name']}>
                {row.status !== 'done' ? (
                    <div style={{ width: 7.6 * row.percent }} className={styles['file-process']}></div>
                ) : (
                    ''
                )}
                <span className={styles['file-icon']}>
                    <img src={getFileIconByName(row.name)} alt="icon"></img>
                    <span>{row.name}</span>
                </span>
            </div>
        )
    }
    getFileStatus(text, row, index) {
        const icon =
            row.status === 'uploading' ? (
                <Icon className="text-primary" type="loading" />
            ) : (
                <i className={FILE_STATUS_MAP[row.status]['icon']}></i>
            )
        return (
            <Fragment>
                {icon} {FILE_STATUS_MAP[row.status]['label']}
            </Fragment>
        )
    }
    removeFile(file: IFile) {
        this.setState({
            fileList: filter(this.state.fileList, (n: IFile) => {
                return n.uid !== file.uid
            }),
        })
    }
    getFileActions(text, row, index) {
        return row.status === 'done' ? (
            <i
                className="iconfont icontableClose icon-primary pointer fs-14"
                onClick={this.removeFile.bind(this, row)}></i>
        ) : (
            ''
        )
    }
    getFileList() {
        const { fileList, popStatus } = this.state
        if (popStatus === UPLOAD_POP_STATUS.MIN) {
            const dones = filter(fileList, { status: 'done' })
            return (
                <div className={styles['upload-summary']}>
                    <div className={styles['upload-summary-title']}>
                        {dones.length > 0 ? `有${dones.length}个文件上传成功` : '还没有文件上传'}
                    </div>
                    <i className="iconfont icontableClose pointer fs-14"></i>
                </div>
            )
        }
        const columns = [
            {
                title: '文件名',
                dataIndex: 'name',
                key: 'name',
                render: this.getFileName.bind(this),
            },
            {
                title: '大小',
                dataIndex: 'size',
                key: 'size',
                width: 120,
                render: (text, row, index) => getFileSize(row.size),
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                width: 180,
                render: this.getFileStatus.bind(this),
            },
            {
                title: '',
                dataIndex: '',
                key: 'actions',
                width: 60,
                render: this.getFileActions.bind(this),
            },
        ]
        map(fileList, n => {})
        return <Table columns={columns} dataSource={fileList} pagination={false} />
    }
    render() {
        const { isVisible, width } = this.state
        return (
            <Fragment>
                <Upload {...this.getModalProps()}>
                    <Button type="primary" className={`action-btn`} icon="plus-circle">
                        添加文件
                    </Button>
                </Upload>
                <Modal
                    title={this.getModelTitle()}
                    wrapClassName="upload-modal"
                    width={width}
                    visible={isVisible}
                    footer={null}
                    destroyOnClose={true}
                    closable={false}
                    onOk={this.save.bind(this)}
                    onCancel={this.cancel.bind(this)}>
                    {this.getFileList()}
                </Modal>
            </Fragment>
        )
    }
}
