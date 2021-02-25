import React, { useState, useRef, useEffect } from 'react';
import { Button, Table } from 'antd';
import { history } from '@utils/history'
import { getTableHeight } from '@utils/index'
import CreateModal from './components/CreateModal';

const mockList = [
  {
    id: 1,
    name: '111',
    dataCount: 10,
    markCount: 1,
    labelCount: 1,
    markTotal: 15,
  },
];

const Project = (props) => {
  const tableHeight = useRef(getTableHeight(280));
  const [list, setList] = useState(mockList);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);

  const fetchList = (page: number = 1) => {
    console.log(page)
  };

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

  const createProject = () => {
    setCreateVisible(true);
  };

  const goDetail = (id: number, url: string) => {
    props.history.push(`/${url}?id=${id}`);
  };

  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据量',
      dataIndex: 'dataCount',
      key: 'dataCount',
    },
    {
      title: '已标注',
      dataIndex: 'markCount',
      key: 'markCount',
    },
    {
      title: '标签数',
      dataIndex: 'labelCount',
      key: 'labelCount',
    },
    {
      title: '标注总数',
      dataIndex: 'markTotal',
      key: 'markTotal',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: '26%',
      render: (_: void, item) => {
        return (
          <>
            <a
              className="m-r-8"
              onClick={() => goDetail(item.id, 'label')}
            >
              标签
            </a>
            <a
              className="m-r-8"
              onClick={() => goDetail(item.id, 'data')}
            >
              数据
            </a>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="c-tp-container">
        <div className="flex-a-c">
          <div className="c-tp-title">
            项目列表
            <span className="c-tp-total">{total}个</span>
          </div>

          <Button type="primary" onClick={createProject}>新建项目</Button>
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

export default Project;
