/** @format */

import React, { Component } from 'react'
import styles from '../../../operate-sign.module.less'
import { Upload, Icon, message } from 'laiye-antd'
import OperateSignRenewalStep1FormComponent from './operate-sign-renewal-step1-form.component'

interface IOperateSignRenewalStep1Props {}
interface IOperateSignRenewalStep1State {
    loading: boolean
    imageUrl: string
    isEdit: boolean
}

export default class OperateSignRenewStep1Component extends Component<
    IOperateSignRenewalStep1Props,
    IOperateSignRenewalStep1State
> {
    constructor(props) {
        super(props)
        this.state = {
            imageUrl: '',
            loading: false,
            isEdit: true,
        }
    }
    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!')
        }
        return isJpgOrPng && isLt2M
    }
    handleChange(info) {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true })
            return
        }
        if (info.file.status === 'done') {
            // this.setState({
            //   loading: false,
            // })
        }
    }
    getBusinessLicense() {
        const uploadButton = (
            <div>
                <Icon className="ant-upload-icon" type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">添加上传图片</div>
            </div>
        )
        const { imageUrl } = this.state
        return (
            <div className={styles['renewal-card']}>
                <div className={styles['renewal-card-header']}>企业营业执照</div>
                <div className={styles['renewal-card-body']}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={this.beforeUpload.bind(this)}
                        onChange={this.handleChange}>
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </div>
            </div>
        )
    }
    changeState() {}
    save() {
        console.log('step1 form submit')
    }
    render() {
        const { isEdit } = this.state
        return (
            <div>
                {this.getBusinessLicense()}
                <OperateSignRenewalStep1FormComponent isEdit={isEdit} changeState={this.changeState.bind(this)} />
            </div>
        )
    }
}
