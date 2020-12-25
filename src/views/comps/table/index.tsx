/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent } from '@components/index'
import { Table, Tag, Input, Icon, Button, Tooltip, Modal } from 'laiye-antd'
import { MODAL_SIZE } from '@constants/index'
import TableCollecrtionComponent from './table.collection.component'
import { ListMixin } from '@components/mixin/list.mixin'
import { getUsers, getUserDetail, updateUser, deleteUser } from '@apis/index'

interface ITableProps {
  data: {}[]
  loading: boolean
  pagination: {}
  searchAction: () => {}
  openCollection: () => {}
  closeCollection: () => {}
  getList: () => {}
  getRowKey: any
  collectionCallBack: () => {}
  editEntity: any
  deleteEntity: any
  entity: {}
  isCollectionVisible: boolean
}

interface ITableState {}

class TableView extends Component<ITableProps, ITableState> {
  init() {
    return {
      fetchAction: getUsers,
      getDetailAction: getUserDetail,
      updateAction: updateUser,
      deleteAction: deleteUser,
    }
  }

  getRowKey(record, index) {
    return record.id || record._id || index
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
        render: (text, record) => (
          <span>
            <span className="m-l-12 m-r-12 icon-action">
              <Icon type="setting" /> 设置
            </span>
            <span className="m-l-12 m-r-12 icon-action">
              <Tooltip type="bright" placement="top" title="编辑">
                <Icon type="form" onClick={this.editAction.bind(this, record)} />
              </Tooltip>
            </span>
            <span className="m-l-12 m-r-12 icon-action">
              <Tooltip type="bright" placement="top" title="删除">
                <Icon type="delete" onClick={this.deleteAction.bind(this, record)} />
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
          <Input
            className="search"
            onKeyDown={searchAction}
            suffix={<Icon type="search" />}
            placeholder="搜索你的文件"
          />
        </Fragment>
        <Fragment key="actions">
          <Button type="primary" icon="plus" className={`${'action-btn'}`} onClick={openCollection}>
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
