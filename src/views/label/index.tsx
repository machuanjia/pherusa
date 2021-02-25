import React, { useState, useRef, useEffect } from 'react';
import { Button, Table } from 'antd';
import { history } from '@utils/history'
import { getTableHeight } from '@utils/index';
import CreateModal from './components/CreateModal';

const mockList = [{ id: 1, name: '姓名', color: '#ffffff' }];

const Label = () => {
  const tableHeight = useRef(getTableHeight(280));
  const [list, setList] = useState(mockList);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);

  const fetchList = (page: number = 1) => {};

  useEffect(() => {
    fetchList();
  }, []);

  const closeModal = (
    isRefetch: boolean = false,
    setStateFunc: (value: any) => void,
    needPoll: boolean = false,
  ) => {
    setStateFunc(false);

    if (isRefetch) {
      fetchList(page);
    }
  };

  const createLabel = () => {
    setCreateVisible(true);
  };

  const editItem = (item) => {

  }

  const delItem = (item) => {

  }

  const columns = [
    {
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      render: (_: void, item) => {
        return (
          <>
            {/* <a className="m-r-8" onClick={() => editItem(item)}>编辑</a> */}
            <a onClick={() => delItem(item)}>删除</a>
          </>
        )
      },
    },
  ];

  return (
    <>
      <div className="c-tp-container">
        <div className="flex-a-c">
          <div className="c-tp-title">
            标签列表
            <span className="c-tp-total">{total}个</span>
          </div>

          <Button type="primary" onClick={createLabel}>新建标签</Button>
        </div>
        <div className="c-tp-table">
          <Table
            tableLayout="fixed"
            rowKey="id"
            columns={columns}
            dataSource={list}
            scroll={{ y: tableHeight.current }}
            loading={isLoading}
            pagination={{
              current: page,
              pageSize: 20,
              total,
              showSizeChanger: false,
              size: 'small',
            }}
            onChange={({ current }) => fetchList(current)}
          />
        </div>
      </div>
      <CreateModal
        visible={createVisible}
        close={isRefresh => closeModal(isRefresh, setCreateVisible)}
      />
    </>
  );
};

export default Label;
