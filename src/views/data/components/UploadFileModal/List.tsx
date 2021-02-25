/*
 * @Author: xulijing
 * @Date: 2021-02-25 11:44:59
 * @LastEditTime: 2021-02-25 11:48:55
 * @FilePath: /pherusa/src/views/data/components/UploadFileModal/List.tsx
 */
import React from 'react';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { formatBytes } from '@utils/index';
import { UploadStateFe, uploadStateMap } from '@interfaces/data';
import styles from './index.module.less';

export type Item = {
  name: string;
  file: File;
  status: number;
  isConflict: boolean;
};

export type UploadStateMap = Record<number, string>;

type Props = {
  list: Item[];
  isSelectStep: boolean;
  delItem: (index: number) => void;
};

const List = (props: Props) => {
  const { list, isSelectStep, delItem } = props;

  return (
    <>
      <div className={`${styles.item} t-header`}>
        <span className={styles['item-first']}>数据名</span>
        <span className={styles['item-next']}>大小</span>
        <span className={styles['item-action']}>
          {isSelectStep ? '操作' : '状态'}
        </span>
      </div>
      <div className={styles['item-list']}>
        {list.map((item, index) => (
          <div key={index} className={styles.item}>
            {item.isConflict ? (
              <i
                className={`iconfont icon-warning-fill ${styles['item-conflict']}`}
              />
            ) : (
              ''
            )}
            <span className={`text-ellipsis ${styles['item-first']}`}>
              {item.name}
            </span>
            <span className={styles['item-next']}>
              {formatBytes(item.file.size)}
            </span>
            {isSelectStep ? (
              <a
                className={styles['item-action']}
                onClick={() => delItem(index)}
              >
                删除
              </a>
            ) : (
              <span className={`${styles['item-status']} t-${item.status}`}>
                {item.status === UploadStateFe.loading && (
                  <Loading3QuartersOutlined  className="m-r-8" />
                )}
                {uploadStateMap[item.status]}
              </span>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
