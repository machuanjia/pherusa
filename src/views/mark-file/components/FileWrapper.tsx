import React from 'react';
import { Popover, message } from 'antd';
import {
  fetchFileContent,
  getPdfInfo,
  getHighlightList,
  getBoundaryContent,
} from '@utils/image-mark';
import type {
  HighlightItem,
  MarkSelect,
  MarkStyle,
  LabelItem,
  LabelMark,
  LabelMarkItem
} from '@interfaces/image-mark';
import { res } from '../mock';
import { getBoundary, getStyle } from './helper';
import ImageShow from './left/ImageShow';
import PdfShow from './left/PdfShow';
import PopContent from './left/PopContent';
import styles from './index.module.less';

type Props = {
  fileUrl: string;
  labels: LabelItem[];
  scale: number;
  labelContentList: LabelMark[];
  setLabelResult: (value: LabelMark[]) => void;
  setScale: (value: number) => void;
};

type State = {
  imageBase64: string;
  pdf: any;
  width: number;
  isDrawing: boolean;
  result: object | null;
  highlightList: HighlightItem[];
  markVisible: boolean;
  currentSelect: null | MarkSelect;
  markStyle: MarkStyle | null;
};

class FileWrapper extends React.Component<Props, State> {
  $wrapper: HTMLDivElement | null;
  $imgContainer: HTMLDivElement | null;
  startPostion: { x: number; y: number };
  imgPosition: DOMRect | null;

  constructor(props: Props) {
    super(props);
    this.$wrapper = null;
    this.$imgContainer = null;
    this.startPostion = { x: 0, y: 0 };
    this.imgPosition = null;

    this.state = {
      imageBase64: '',
      pdf: null,
      width: 0,
      isDrawing: false,
      result: null,
      highlightList: [],
      markVisible: false,
      currentSelect: null,
      markStyle: null
    };
  }

  componentDidMount() {
    window.addEventListener('mouseup', this.mouseUp);
    // get res, and setScale
    const { result } = res;
    const width = this.$wrapper.clientWidth;
    const scale = +(width / result.rotated_image_width).toFixed(2);
    const highlightList = getHighlightList(result.lines, scale);
    this.props.setScale(scale);
    this.setState({
      width,
      highlightList,
      result,
    });

    const { fileUrl } = this.props;

    fetchFileContent(fileUrl, async (base64: string) => {
      const isPdf = fileUrl.endsWith('pdf');
      if (isPdf) {
        const pdfInfo = await getPdfInfo(base64);
        this.setState({
          pdf: pdfInfo,
        });
      } else {
        this.setState({
          imageBase64: base64,
        });
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);
  }

  mouseUp = (e: any) => {
    const { isDrawing } = this.state;

    if (isDrawing) {
      this.setState({
        isDrawing: false,
      });
      document.removeEventListener('mousemove', this.mouseMove);

      const { x, y } = this.startPostion;
      const { pageX: endX, pageY: endY } = e;
      if (Math.abs(endY - y) < 16 || Math.abs(endX - x) < 16) {
        this.setState({
          markStyle: null,
        });
        return;
      }

      const { top, left } = this.imgPosition;
      const {
        result: { lines },
        markStyle,
      }: any = this.state;
      const { scale } = this.props;
      const position = getBoundary(x - left, y - top, endX - left, endY - top);
      const scalePostion = position.map(item => item / scale);
      const select = getBoundaryContent(lines, scalePostion);

      if (select.text.length === 0) {
        message.error('未匹配到OCR识别结果，请调整画框区域');
        this.setState({
          markStyle: null,
        });
        return;
      }

      this.setState({
        markVisible: true,
      });
      this.setState({
        currentSelect: {
          ...select,
          style: markStyle,
        },
      });
    }
  };

  mouseDown = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const { markVisible } = this.state;

    if (markVisible) {
      this.setState({
        markVisible: false,
        markStyle: null,
      });
      return;
    }

    this.imgPosition = this.$imgContainer.getBoundingClientRect();

    this.startPostion = {
      x: e.pageX,
      y: e.pageY,
    };

    this.setState({
      markStyle: {
        top: e.pageY,
        left: e.pageX,
      },
      isDrawing: true,
    });
    document.addEventListener('mousemove', this.mouseMove);
  };

  mouseMove = (e: MouseEvent) => {
    if (!this.state.isDrawing) {
      return;
    }
    const { pageX, pageY } = e;
    const { x, y } = this.startPostion;
    const newStyle = getStyle(x, y, pageX, pageY, this.imgPosition);
    this.setState({
      markStyle: newStyle,
    });
  };

  submitMark = (labelId: number, labelIndex: number, isMerge: boolean) => {
    const { labelContentList, setLabelResult, labels } = this.props;
    const { currentSelect } = this.state;

    if (!currentSelect) {
      return;
    }

    const targetList = labelContentList[labelIndex];
    const newTargetList = [...targetList];
    const newStyle = {
      ...currentSelect.style,
      borderColor: labels[labelIndex].color,
    };

    if (isMerge) {
      const { length } = newTargetList;
      if (length === 0) {
        message.error('字段未标注，无法和前一个合并');
        return;
      }

      const lastMark: LabelMarkItem = newTargetList.pop();
      const { text, charPostions, styles } = lastMark;
      const { text: newText, charPostions: newCharPostions } = currentSelect;

      newTargetList.push({
        text: text + newText,
        charPostions: [...charPostions, ...newCharPostions],
        styles: [...styles, newStyle],
      });
    } else {
      newTargetList.push({
        ...currentSelect,
        styles: [newStyle],
      });
    }

    setLabelResult([
      ...labelContentList.slice(0, labelIndex),
      newTargetList,
      ...labelContentList.slice(labelIndex + 1),
    ]);

    this.setState({
      markVisible: false,
      markStyle: null,
    });
  };

  render() {
    const {
      imageBase64,
      pdf,
      width,
      markStyle,
      highlightList,
      markVisible,
      currentSelect,
    } = this.state;
    const { labels, children } = this.props;

    let pdfList: number[] = [];
    if (pdf) {
      pdfList = new Array(pdf._pdfInfo.numPages).fill(0);
    }

    return (
      <div className={styles.left} ref={ref => {this.$wrapper = ref}}>
        <div
          className={styles['left-inner']}
          ref={ref => {this.$imgContainer = ref}}
        >
          {imageBase64 && <ImageShow width={width} base64={imageBase64} />}
          {pdfList.map((_: number, index: number) => (
            <PdfShow key={`${index}`} pdf={pdf} width={width} page={index + 1} />
          ))}
          {highlightList.map((item: any, index: number) => {
            return (
              <div
                key={`highlight${index}`}
                className={`${styles.highlight}`}
                style={{
                  top: `${item.top}px`,
                  left: `${item.left}px`,
                  width: `${item.width}px`,
                  height: `${item.height}px`,
                }}
              />
            );
          })}
          {children}
          <div
            className={`${styles['left-mask']} ${true ? 'active' : ''}`}
            onMouseDown={this.mouseDown}
            onMouseUp={this.mouseUp}
          />
          <Popover
            trigger={[]}
            visible={markVisible}
            overlayStyle={{ width: 300 }}
            title="标注"
            content={
              <PopContent
                labels={labels}
                text={currentSelect?.text || ''}
                submitMark={this.submitMark}
              />
            }
          >
            <div
              className={styles['left-res']}
              style={markStyle || undefined}
            />
          </Popover>
        </div>
      </div>
    );
  }
}

export default FileWrapper;
