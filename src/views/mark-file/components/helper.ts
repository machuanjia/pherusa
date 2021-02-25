/*
 * @Author: xulijing
 * @Date: 2021-02-24 20:24:49
 * @LastEditTime: 2021-02-25 11:32:57
 * @FilePath: /pherusa/src/views/mark-file/components/helper.ts
 */
import type { MarkStyle } from '@interfaces/image-mark';

// return top, right, bottom, left
export const getBoundary = (x1: number, y1: number, x2: number, y2: number) => {
  let top = y1;
  let bottom = y2;
  let left = x1;
  let right = x2;

  if (y1 > y2) {
    top = y2;
    bottom = y1;
  }

  if (x1 > x2) {
    left = x2;
    right = x1;
  }

  return [top, right, bottom, left];
};

export const getStyle = (
  startX: number,
  startY: number,
  afterX: number,
  afterY: number,
  relativePostion,
) => {
  const width = Math.abs(startX - afterX);
  const height = Math.abs(startY - afterY);

  const style: MarkStyle = {
    width,
    height,
  };

  const { x, y, width: eleWidth, height: eleHeight } = relativePostion;
  // 往左拉
  if (startX > afterX) {
    style.right = eleWidth + x - startX;
  } else {
    style.left = startX - x;
  }

  // 往上拉
  if (startY > afterY) {
    style.bottom = eleHeight + y - startY;
  } else {
    style.top = startY - y;
  }

  return style;
};
