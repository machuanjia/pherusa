/*
 * @Author: xulijing
 * @Date: 2021-02-24 20:24:49
 * @LastEditTime: 2021-02-25 11:37:04
 * @FilePath: /pherusa/src/views/mark-file/components/left/PopContent.tsx
 */
import React, { useState } from 'react';
import { Switch } from 'antd';
import type { LabelItem } from '@interfaces/image-mark';
import styles from './index.module.less';

type Props = {
  text: string;
  labels: LabelItem[];
  submitMark: (labelId: number, labelIndex: number, isMerge: boolean) => void;
};

const PopContent = (props: Props) => {
  const { text, labels, submitMark } = props;
  const [isMerge, setIsMerge] = useState(false);

  // useEffect(() => {
  //   if (!visible) {
  //     setIsMerge(false);
  //   }
  // }, [visible]);

  const submit = (labelId: number, labelIndex: number) => {
    submitMark(labelId, labelIndex, isMerge);
  };

  return (
    <div>
      <div className={`${styles['pop-item']} t-first`}>OCR识别结果</div>
      <div className={styles['pop-txt']}>{text}</div>
      <div className={styles['pop-item']}>是否和前一个标注合并</div>
      <Switch checked={isMerge} onChange={value => setIsMerge(value)} />
      <div className={styles['pop-item']}>选择标签</div>
      {labels.map(({ labelID, labelName }: LabelItem, index: number) => (
        <span
          className={styles['pop-label']}
          key={labelID}
          onClick={() => submit(labelID, index)}
        >
          {labelName}
        </span>
      ))}
    </div>
  );
};

export default PopContent;
