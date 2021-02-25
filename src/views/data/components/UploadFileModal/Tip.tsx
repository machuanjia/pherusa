import React from 'react';
import styles from './index.module.less';

export enum TipType {
  success = 0,
  warning = 1,
  error = 2,
}

const iconMap = {
  [TipType.success]: 'success',
  [TipType.warning]: 'warning-fill',
  [TipType.error]: 'fail',
};

const classMap = {
  [TipType.success]: 'success',
  [TipType.warning]: 'warning',
  [TipType.error]: 'error',
};

type Props = {
  type: TipType;
  content: string | React.ReactNode;
};

const Tip = ({ type, content }: Props) => (
  <div className={`${styles['upload-tip']} t-${classMap[type]}`}>
    <i className={`iconfont icon-${iconMap[type]} m-r-12`} />
    {content}
  </div>
);

export default Tip;
