import React, { useState, useRef, useEffect } from 'react';
import { Button, Table } from 'antd';
import { history } from '@utils/history';
import { getTableHeight } from '@utils/index';
import type { Item } from './components/UploadFileModal/List';
import UploadModal from './components/UploadFileModal';

const mockList = [
  { id: 1, name: '1.txt', status: '未标注', count: 2, type: 1 },
  { id: 2, name: 'mark.pdf', status: '未标注', count: 2, type: 2 },
];

const Data = (props) => {
  const $input = useRef<HTMLInputElement>(null);
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

  const uploadData = () => {
    $input.current.click();
  };

  const checkFileNames = (nameList: string[]) => {};

  const uploadDataFiles = (item: Item, successCb: () => void) => {};

  const goMark = (item: any) => {
    const url = item.type === 1 ? 'txt' : 'file';
    props.history.push(`/mark_${url}?id=${item.id}`);
  };

  const columns = [
    {
      title: '数据名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '数据类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '标注数',
      dataIndex: 'count',
      key: 'count',
    },
    {

      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      width: '26%',
      render: (_: void, item) => {
        return (
          <>
            <a className="m-r-8" onClick={() => goMark(item)}>
              标注
            </a>
            {/* <a onClick={() => delItem(item.id, 'data')}>删除</a> */}
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
            数据列表
            <span className="c-tp-total">{total}个</span>
          </div>

          <Button type="primary" onClick={uploadData}>
            上传数据
          </Button>
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
      <UploadModal
        inputRef={$input}
        fetchList={fetchList}
        accept=".txt, .jpeg, .jpg, .png, .pdf"
        checkFileNames={(nameList: string[]) => checkFileNames(nameList)}
        uploadFile={uploadDataFiles}
      />
    </>
  );
};

export default Data;
