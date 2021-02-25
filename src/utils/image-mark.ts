import type { HighlightItem } from '@interfaces/index'

const PDFJS = require('pdfjs-dist');

PDFJS.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const cmap = {
  cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/cmaps/',
  cMapPacked: true,
};

export const readAsDataURLAsync = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });

export const getPdfInfo = (base64: string) => {
  return new Promise((resolve, reject) => {
    PDFJS.getDocument({ url: base64, ...cmap })
      .promise.then(pdf => {
        resolve(pdf);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const renderPdf2Canvas = (
  pdf,
  currentPage: number,
  $canvas: HTMLCanvasElement,
  width,
) => {
  return new Promise((resolve, reject) => {
    pdf
      .getPage(currentPage)
      .then(page => {
        const { width: realWidth } = page.getViewport({ scale: 1 });
        const scale = width / realWidth;
        const viewport = page.getViewport({ scale });
        const context = $canvas.getContext('2d');
        const canvas = $canvas;
        $canvas.width = width;
        $canvas.height = viewport.height;

        const task = page.render({ canvasContext: context, viewport });
        task.promise.then(() => {
          resolve(scale);
        });
      })
      .catch(error => {
        console.log('获取pdf页面失败', error);
        reject(error);
      });
  });
};

export const renderImg2Canvas = (
  imgBase64: string,
  $canvas: HTMLCanvasElement,
  width: number,
) => {
  return new Promise((resolve, reject) => {
    const ctx = $canvas.getContext('2d');

    const image = new Image();
    image.onload = () => {
      const { naturalWidth, naturalHeight } = image;
      const scale = width / naturalWidth;
      $canvas.width = width;
      $canvas.height = naturalHeight * scale;
      ctx.drawImage(image, 0, 0);
      resolve(scale);
    };
    image.src = imgBase64;
  });
};

export const fetchFileContent = (
  url: string,
  cb: (readerResult: string | Buffer, file) => void,
  count: number = 1,
) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'blob';
  request.onload = () => {
    const file = request.response;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader && reader.result) {
        const readerResult: any = reader.result;
        cb(readerResult, file);
      }
    };
  };

  request.onerror = error => {
    console.error('fetch图片出错', error);
    // refetch, 最多三次
    if (count > 3) {
      return;
    }
    fetchFileContent(url, cb, count + 1);
  };

  request.send();
};

export const getLineBoundary = (positionsList: number[]) => {
  const left = positionsList[0];
  const top = positionsList[1];
  const right = positionsList[4];
  const bottom = positionsList[5];

  return [top, right, bottom, left];
};

export const getElePosFromPositionList = (
  positionsList: number[],
  xRatio = 1,
) => {
  if (!positionsList || !positionsList.length) {
    return null;
  }

  const [minY, maxX, maxY, minX] = getLineBoundary(positionsList);

  const width = (maxX - minX) * xRatio;
  const height = (maxY - minY) * xRatio;
  const top = minY * xRatio;
  const left = minX * xRatio;

  return {
    width,
    height,
    top,
    left,
  };
};

export const getHighlightList = (itemsList: any[], xRatio: number) => {
  if (!itemsList) {
    return [];
  }

  const heightListGroup: HighlightItem[] = [];
  itemsList.forEach((item: any) => {
    const { position } = item;
    const div = getElePosFromPositionList(position, xRatio);

    if (!div) {
      return;
    }

    heightListGroup.push(div);
  });

  return heightListGroup;
};

export const getBoundaryContent = (lines: any[], positions: number[]) => {
  const [top, right, bottom, left] = positions;
  const textList = [];
  const charPostions = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [lineTop, lineRight, lineBottom, lineLeft] = getLineBoundary(
      line.position,
    );

    if (top > lineTop) {
      continue;
    }

    // top <= lineTop &&
    if (bottom >= lineBottom) {
      const { char_polygons: charPolygons, text } = line;

      for (let j = 0; j < charPolygons.length; j++) {
        const [charTop, charRight, charBottom, charLeft] = getLineBoundary(
          charPolygons[j],
        );
        if (left <= charLeft && right >= charRight) {
          textList.push(text[j]);
          charPostions.push(charPolygons[j]);
        }
      }
    }

    if (bottom < lineTop) {
      break;
    }
  }

  return {
    text: textList.join(''),
    charPostions,
  };
};
