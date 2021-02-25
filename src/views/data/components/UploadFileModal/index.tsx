import React, { useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import { v4 as uuidV4 } from 'uuid';
import { UploadStateFe } from '@interfaces/index';
import type { Item } from './List';
import List from './List';
import Tip, { TipType } from './Tip';
import styles from './index.module.less';

export type { Item };

enum Step {
  select = 1,
  upload = 2,
}

type Props = {
  inputRef: React.Ref<HTMLInputElement>;
  fetchList: () => void;
  accept: string;
  // checkFileNames: (names: string[]) => Promise<object>;
  checkFileNames: (names: string[]) => void;
  // uploadFile: (item: Item, successCb: () => void) => Item;
  uploadFile: (item: Item, successCb: () => void) => void;
};

const UploadModal = (props: Props) => {
  const { fetchList, inputRef, accept, uploadFile, checkFileNames } = props;

  const inputKey = useRef<string>(uuidV4());
  const [uploadVisible, setUploadVisible] = useState(false);
  const [fileList, setFileList] = useState<Item[]>([]);
  const [checkLoading, setCheckLoading] = useState(false);
  const [step, setStep] = useState(Step.select);
  const [isUploading, setIsUploading] = useState(false);
  const [successCount, setSuccessCount] = useState(0);

  const close = (isRefetch: boolean = false) => {
    setUploadVisible(false);

    if (isRefetch) {
      fetchList();
    }
  };

  const checkIfRepeat = async (filesArr: Item[]) => {
    setCheckLoading(true);

    const nameList = filesArr.map(file => file.name);
    try {
      const { duplicateNameListList }: any = await checkFileNames(nameList);
      const newArr = filesArr.map(item => {
        if (duplicateNameListList.indexOf(item.name) > -1) {
          return { ...item, isConflict: true };
        }
        return item;
      });
      setFileList(newArr);
    } catch (error) {
      console.error('checkFileNames', error);
    }
    setCheckLoading(false);
  };

  const fileChanged = e => {
    const { files } = e.target;
    if (files.length === 0) {
      return;
    }

    // reset input
    inputKey.current = uuidV4();
    setUploadVisible(true);

    const filesArr: File[] = Array.from(files);
    const newList = [
      ...fileList,
      ...filesArr.map(file => ({
        name: file.name,
        file,
        status: UploadStateFe.default,
        isConflict: false,
      })),
    ];
    checkIfRepeat(newList);
    setFileList(newList);
  };

  const delItem = (index: number) => {
    setFileList([...fileList.slice(0, index), ...fileList.slice(index + 1)]);
  };

  const changeFileList = (list: Item[], index: number, targetItem: Item) => {
    const newFileList = [
      ...list.slice(0, index),
      targetItem,
      ...list.slice(index + 1),
    ];

    setFileList(newFileList);

    return newFileList;
  };

  const upload = async () => {
    setIsUploading(true);
    setStep(Step.upload);
    let newFileList = fileList.slice();
    let newSuccessCount = successCount;

    for (let i = 0; i < fileList.length; i++) {
      const item = fileList[i];

      // 不是等待中或者网络错误，不做处理
      if (
        item.status !== UploadStateFe.default &&
        item.status !== UploadStateFe.networkError
      ) {
        continue;
      }

      // 上传中
      const loadingItem = { ...item, status: UploadStateFe.loading };
      newFileList = changeFileList(newFileList, i, loadingItem);

      // eslint-disable-next-line
      const targetItem: any = await uploadFile(item, () =>
        setSuccessCount(++newSuccessCount),
      );

      newFileList = changeFileList(newFileList, i, targetItem);
    }
    setIsUploading(false);
  };

  const cancel = () => {
    if (successCount > 0) {
      fetchList();
    }

    close();
    setFileList([]);
    setStep(Step.select);
    setSuccessCount(0);
    setIsUploading(false);
  };

  const totalCount = fileList.length;
  const isSelectStep = step === Step.select;
  const isUpload = step === Step.upload;
  const isConflict = fileList.filter(item => item.isConflict).length > 0;
  const failCount = totalCount - successCount;
  const needRetry =
    fileList.filter(item => item.status === UploadStateFe.networkError).length >
    0;

  return (
    <>
      <input
        key={inputKey.current}
        type="file"
        multiple
        accept={accept}
        className={styles['upload-input']}
        ref={inputRef}
        onChange={fileChanged}
      />
      <Modal
        visible={uploadVisible}
        title="上传数据"
        closable={isSelectStep}
        onCancel={cancel}
        width={560}
        footer={null}
        maskClosable={false}
      >
        {isSelectStep && isConflict ? (
          <Tip
            type={TipType.warning}
            content="存在重复文件，确认上传将覆盖现有文件"
          />
        ) : null}
        {totalCount > 100 ? (
          <Tip type={TipType.warning} content="单次上传不能超过100个文件" />
        ) : null}
        {isUpload && !isUploading ? (
          <Tip
            type={failCount ? TipType.error : TipType.success}
            content={
              <span>
                {successCount} 个上传成功，共
                {totalCount}个
                {needRetry ? (
                  <span className={styles['upload-retry']} onClick={upload}>
                    全部重试
                  </span>
                ) : null}
              </span>
            }
          />
        ) : null}
        <List list={fileList} isSelectStep={isSelectStep} delItem={delItem} />
        {isSelectStep ? (
          <div className="flex-a-c">
            <span className="m-r-auto">
              共{totalCount}
              个文件
              {checkLoading ? '，检测重复中...' : ''}
            </span>
            <Button  className="m-r-16" onClick={cancel}>
              取消
            </Button>
            <Button
              type="primary"
              disabled={checkLoading || totalCount === 0 || totalCount > 100}
              onClick={upload}
            >
              上传
            </Button>
          </div>
        ) : null}
        {isUpload ? (
          <div className="flex-a-c">
            {isUploading ? (
              <div>
                已成功上传
                {successCount}
                个，共
                {totalCount}个
              </div>
            ) : null}
            <Button
              type="primary"
              className="c-ml-auto"
              loading={isUploading}
              onClick={cancel}
            >
              {isUploading ? '正在上传' : '关闭'}
            </Button>
          </div>
        ) : null}
      </Modal>
    </>
  );
};

export default UploadModal;
