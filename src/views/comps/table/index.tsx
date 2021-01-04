/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent } from '@components/index'
import { Table, Input, Button, Tooltip, Modal } from 'antd'
import { MODAL_SIZE } from '@constants/index'
import TableCollecrtionComponent from './table.collection.component'
import { ListMixin } from '@components/mixin/list.mixin'
import { getUsers, getUserDetail, updateUser, deleteUser } from '@apis/index'
import { IListMixin } from '@entities/mixin'
import { SettingOutlined, EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons'

interface ITableState {}

class TableView extends Component<IListMixin, ITableState> {
  init() {
    return {
      fetchAction: getUsers,
      getDetailAction: getUserDetail,
      updateAction: updateUser,
      deleteAction: deleteUser,
    }
  }

  editAction(record) {
    this.props.editEntity(record._id)
  }

  deleteAction(record) {
    this.props.deleteEntity(record._id)
  }

  getTable() {
    const { data, loading, pagination, getRowKey } = this.props
    const columns = [
      {
        title: '名称',
        dataIndex: 'username',
        key: 'username',
        render: text => text,
      },
      {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '操作',
        key: 'action',
        width: 200,
        render: (text, record) => (
          <span>
            <span className="m-l-12 m-r-12 icon-action">
              <SettingOutlined /> 设置
            </span>
            <span className="m-l-12 m-r-12 icon-action">
              <Tooltip placement="top" title="编辑">
                <EditOutlined onClick={this.editAction.bind(this, record)} />
              </Tooltip>
            </span>
            <span className="m-l-12 m-r-12 icon-action">
              <Tooltip placement="top" title="删除">
                <DeleteOutlined onClick={this.deleteAction.bind(this, record)} />
              </Tooltip>
            </span>
          </span>
        ),
      },
    ]

    return (
      <Table
        rowKey={getRowKey}
        pagination={pagination}
        loading={loading}
        bordered={true}
        columns={columns}
        dataSource={data}
      />
    )
  }

  render() {
    const {
      searchAction,
      isCollectionVisible,
      openCollection,
      closeCollection,
      collectionCallBack,
      entity,
    } = this.props
    return (
      <ContentLayoutComponent>
        <Fragment key="left">
          <Input className="search" onKeyDown={searchAction} suffix={<SearchOutlined />} placeholder="搜索你的文件" />
        </Fragment>
        <Fragment key="actions">
          <Button type="primary" icon={<PlusOutlined />} className={`${'action-btn'}`} onClick={openCollection}>
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
            onCancel={closeCollection}>
            {
              // @ts-ignore
              <TableCollecrtionComponent entity={entity} callback={collectionCallBack} />
            }
          </Modal>
        </Fragment>
      </ContentLayoutComponent>
    )
  }
}

export default ListMixin(TableView)
