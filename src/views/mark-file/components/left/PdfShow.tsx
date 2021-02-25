/*
 * @Author: xulijing
 * @Date: 2021-02-24 20:24:49
 * @LastEditTime: 2021-02-25 11:36:12
 * @FilePath: /pherusa/src/views/mark-file/components/left/PdfShow.tsx
 */
import React, { useRef, useEffect } from 'react';
import { renderPdf2Canvas } from '@utils/image-mark';

type PdfFileProps = {
  pdf: any;
  page: number;
  width: number;
};

const PdfShow = ({ pdf, width, page }: PdfFileProps) => {
  const $canvas = useRef();

  useEffect(() => {
    if (width === 0) {
      return;
    }

    renderPdf2Canvas(pdf, page, $canvas.current, width);
  }, [width]);

  return <canvas ref={$canvas}></canvas>;
};

export default PdfShow;
