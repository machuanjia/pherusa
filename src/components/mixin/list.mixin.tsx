/** @format */

import React, { Component } from 'react'
interface IListProps {}
interface IListState {
  data: {}[]
  loading: boolean
  isCollectionVisible: boolean
  entity: {}
}
export const ListMixin = ComposedComponent =>
  class extends Component<IListProps, IListState> {
    private instance = null
    private fetchAction = null
    private getDetailAction = null
    private updateAction = null
    private deleteAction = null

    private beforeFetch = null
    private afterFtech = null
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
        data: [],
        loading: false,
        isCollectionVisible: false,
        entity: null,
      }
    }

    componentDidMount() {
      this.beforeFetch()
      this.getList()
      this.afterFtech()
    }

    searchAction(e) {
      const code = e.keyCode
      const value = e.target.value
      if (code === 13) {
        this.searchText = value
        this.pagination.pageIndex = 1
        this.pagination.pageSize = 20
        this.getList()
      }
    }

    onShowSizeChange(current, pageSize) {
      this.pagination.pageSize = pageSize
      this.getList()
    }

    pageChange(page, pageSize) {
      this.pagination.pageIndex = page
      this.getList()
    }

    openCollection() {
      this.setState({
        isCollectionVisible: true,
      })
    }

    closeCollection() {
      this.setState({
        isCollectionVisible: false,
      })
    }

    collectionCallBack({ isVisible, isRefresh }) {
      isVisible && this.openCollection()
      !isVisible && this.closeCollection()
      isRefresh && this.getList()
    }

    getInstance(instance) {
      if (instance) {
        this.instance = instance
        const {
          fetchAction = () => {},
          getDetailAction = () => {},
          updateAction = () => {},
          deleteAction = () => {},
          beforeFetch = () => {},
          afterFtech = () => {},
        } = this.instance.init()
        this.fetchAction = fetchAction
        this.getDetailAction = getDetailAction
        this.updateAction = updateAction
        this.deleteAction = deleteAction
        this.beforeFetch = beforeFetch
        this.afterFtech = afterFtech
      }
    }

    getList() {
      this.setState({
        loading: true,
      })
      this.fetchAction({
        pi: this.pagination.pageIndex - 1,
        ps: this.pagination.pageSize,
        keyword: this.searchText,
      }).then(res => {
        const { page, total, data } = res.data
        this.pagination.total = total
        this.pagination.pageIndex = page
        this.setState({
          loading: false,
          data,
        })
      })
    }

    editEntity(id: string) {
      this.getDetailAction(id).then(
        ({ data }) => {
          this.setState({
            entity: data,
            isCollectionVisible: true,
          })
        },
        err => {},
      )
    }

    deleteEntity(id: string) {
      this.deleteAction(id).then(
        ({ data }) => {
          this.getList()
        },
        error => {},
      )
    }

    getRowKey(record, index) {
      return record.id || record._id || index
    }

    render() {
      const { loading, data, isCollectionVisible, entity } = this.state
      return (
        <ComposedComponent
          loading={loading}
          data={data}
          entity={entity}
          pagination={this.pagination}
          isCollectionVisible={isCollectionVisible}
          searchAction={this.searchAction.bind(this)}
          openCollection={this.openCollection.bind(this)}
          closeCollection={this.closeCollection.bind(this)}
          getRowKey={this.getRowKey.bind(this)}
          getList={this.getList.bind(this)}
          collectionCallBack={this.collectionCallBack.bind(this)}
          editEntity={this.editEntity.bind(this)}
          deleteEntity={this.deleteEntity.bind(this)}
          {...this.props}
          ref={this.getInstance.bind(this)}
        />
      )
    }
  }
