/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent, UploadComponent } from '@components/index'
import { Upload, message, Input, Button, Icon } from 'laiye-antd'
import FileListComponent from '@components/file/file-list.component'
import { Divider } from 'laiye-antd'
import FolderCollectionComponent from '@components/file/folder-collection.component'
import { connect } from 'react-redux'
// import { initFiles, clearFiles } from '@stores/files/files-actions'
import { IFile } from '@entities/file'

interface IFileState {
  isCollectionVisible: boolean
}

interface IFileProps {
  route?: {
    component: {}
    meta: {
      key?: string
      name?: string
    }
    path: string
  }
}

class FileView extends Component<IFileProps, IFileState> {
  constructor(props) {
    super(props)
    this.state = {
      isCollectionVisible: false,
    }
  }

  componentDidMount() {
    // 获取数据
  }

  componentWillUnmount() {
    // 销毁
  }

  openFolderCollection() {
    this.setState({
      isCollectionVisible: true,
    })
  }
  render() {
    const route = this.props.route
    const { isCollectionVisible } = this.state

    return (
      <ContentLayoutComponent>
        <Fragment key="title">{route.meta.name}</Fragment>
        <Fragment key="actions">
          <Input suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="搜索你的文件" />
          <Button
            type="dark"
            className={`${'m-l-16 m-r-16 action-btn'}`}
            onClick={this.openFolderCollection.bind(this)}>
            新建文件夹
          </Button>
          <UploadComponent></UploadComponent>
        </Fragment>
        <Fragment key="bread">
          <a>
            <i className="iconfont iconbreadLeft fs-14"></i>
            <span className="text-primary m-l-4">返回</span>
          </a>
          <Divider type="vertical" />
          <a>全部资料</a>
          <i className="iconfont iconbreadRight m-l-8 m-r-8 fs-14"></i>
          <span>来也科技公司介绍</span>
        </Fragment>
        <Fragment key="main">
          <FileListComponent />
          <FolderCollectionComponent visible={isCollectionVisible} />
        </Fragment>
      </ContentLayoutComponent>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    initFiles: (files: IFile[]) => {
      // dispatch(initFiles(files))
    },
    clearFiels: () => {
      // dispatch(clearFiles())
    },
  }
}

const mapStateToProps = (state: any) => {
  return {
    list: state.file.files,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FileView)
