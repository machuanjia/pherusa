/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent } from '@components/index'
import { Upload, Modal, Button } from 'laiye-antd'

interface IOperateCertificateProps {
    route?: {
        component: {}
        meta: {
            key?: string
            name?: string
        }
        path: string
    }
}
interface IOperateCertificateState {
    fileList: any[]
    previewVisible: boolean
    previewImage: string
}

export default class OperateCertificateView extends Component<IOperateCertificateProps, IOperateCertificateState> {
    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
            ],
        }
    }

    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await this.getBase64(file.originFileObj)
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        })
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    handleCancel = () => this.setState({ previewVisible: false })

    render() {
        const route = this.props.route
        const { fileList, previewVisible, previewImage } = this.state
        return (
            <ContentLayoutComponent>
                <Fragment key="title">{route.meta.name}</Fragment>
                <Fragment key="main">
                    <div>点击下方 下载证书 按钮，下载您的专属证书</div>
                    <Upload
                        className="picture-wrap m-t-12"
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onRemove={() => false}
                        onPreview={this.handlePreview.bind(this)}
                        onChange={this.handleChange.bind(this)}></Upload>
                    <Button className="m-t-12" type="primary">
                        下载证书
                    </Button>
                    <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </Fragment>
            </ContentLayoutComponent>
        )
    }
}
