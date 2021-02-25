/*
 * @Author: xulijing
 * @Date: 2021-02-24 20:24:49
 * @LastEditTime: 2021-02-25 11:33:39
 * @FilePath: /pherusa/src/views/mark-file/components/left/ImageShow.tsx
 */
import React, { useRef, useEffect } from 'react';
import { renderImg2Canvas } from '@utils/image-mark';

type ImageFileProps = {
  base64: string;
  width: number;
};

const ImageShow = ({ base64, width }: ImageFileProps) => {
  const $canvas = useRef();

  useEffect(() => {
    if (width === 0) {
      return;
    }

    renderImg2Canvas(base64, $canvas.current, width);
  }, [width]);

  return <canvas ref={$canvas}></canvas>;
};

export default ImageShow;
