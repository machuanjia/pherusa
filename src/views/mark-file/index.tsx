import React from 'react';
import { Alert, Collapse, Button, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import type { LabelItem, LabelMark, LabelMarkItem } from '@interfaces/image-mark';
import FileWrapper from './components/FileWrapper';
import { labelList, res } from './mock';
import styles from './index.module.less';

// pdf:  /mark.pdf
// img: /image.png

const { Panel } = Collapse;

type State = {
  fileUrl: string;
  labels: LabelItem[];
  res: object;
  labelContentList: LabelMark[];
  activeHightlight: string;
  scale: number;
  activeKeys: number[];
};

class Mark extends React.Component<State, any> {
  constructor(props) {
    super(props);
    this.state = {
      fileUrl: '/mark.pdf',
      labels: labelList,
      res,
      labelContentList: new Array(labelList.length)
        .fill(0)
        .map(() => new Array()),
      activeHightlight: '',
      scale: 1,
      activeKeys: labelList.map(item => item.labelID),
    };
  }

  changeActiveKey = (keys: string | string[]) => {
    console.log('keys', keys);
    this.setState({
      activeKeys: keys,
    });
  };

  setScale = (value: number) => {
    this.setState({
      scale: value,
    });
  };

  setLabelResult = (value: LabelMark[]) => {
    this.setState({
      labelContentList: value,
    });
  };

  delLabelContent = (labelIndex: number, markIndex: number) => {
    const { labelContentList } = this.state;
    const targetContent = labelContentList[labelIndex];

    this.setState({
      labelContentList: [
        ...labelContentList.slice(0, labelIndex),
        [
          ...targetContent.slice(0, markIndex),
          ...targetContent.slice(markIndex + 1),
        ],
        ...labelContentList.slice(labelIndex + 1),
      ],
    });
  };

  setHightLight = (value: string) => {
    this.setState({
      activeHightlight: value,
    });
  };

  submit = () => {
    const { labelContentList } = this.state;
    for (let i = 0; i < labelContentList.length; i++) {
      if (labelContentList[i].length === 0) {
        message.error(`第${i + 1}个标签未标注`);
        return;
      }
    }

    // send request
    // 需要处理一下labelContentList中的style，矫正为图片上的正坐标
  };

  render() {
    const {
      fileUrl,
      labels,
      labelContentList,
      activeHightlight,
      scale,
      activeKeys,
    } = this.state;

    return (
      <div className={styles.mark}>
        <FileWrapper
          fileUrl={fileUrl}
          labels={labels}
          scale={scale}
          labelContentList={labelContentList}
          setLabelResult={this.setLabelResult}
          setScale={this.setScale}
        >
          {labelContentList.map((item: LabelMark, index: number) => {
            const { labelID } = labels[index];

            return item.map((markItem: LabelMarkItem, markIndex: number) => {
              const { styles: stylesList } = markItem;
              const isActive = activeHightlight === `${labelID}-${markIndex}`;

              return stylesList.map((style, styleIndex) => (
                <div
                  key={`${labelID}-${markIndex}-${styleIndex}`}
                  className={`${styles['mark-style']} ${
                    isActive ? 'active' : ''
                  }`}
                  style={style}
                />
              ));
            });
          })}
        </FileWrapper>
        <div className={styles['mark-right']}>
          <Alert
            type="warning"
            message="注意"
            description="1. 本期只支持框选；2. 本期不支持框选面积根据阈值确定是否选中，一定要注意框选的范围，框可以大，但一定要把想要的文字全部包围"
          />
          <Collapse activeKey={activeKeys} onChange={this.changeActiveKey}>
            {labels.map(({ labelID, labelName }: LabelItem, index: number) => {
              const markList = labelContentList[index];

              return (
                <Panel header={labelName} key={labelID}>
                  {markList.map((item: LabelMarkItem, markIndex: number) => {
                    const key = `${labelID}-${markIndex}`;

                    return (
                      <div className={styles['label-value']} key={key}>
                        <div
                          className={styles['label-text']}
                          onClick={() => this.setHightLight(key)}
                        >
                          {item.text}
                        </div>
                        <CloseOutlined
                          className={styles['label-delete']}
                          onClick={() => this.delLabelContent(index, markIndex)}
                        />
                      </div>
                    );
                  })}
                </Panel>
              );
            })}
          </Collapse>

          <div className={styles['mark-footer']}>
            <Button type="primary" onClick={this.submit}>
              标注完成
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Mark;
