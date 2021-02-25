import React from 'react';
import LocalStore from './store';
import styles from './index.module.less';
import Highlighter from 'web-highlighter';

type lableItem = { labelId: number; labelName: string; labelColor: string };

type Props = {
  // 需要划词的区域
  highLighterContainerEle: JSX.Element;
  handleChange: () => void;
};

type State = {
  // 高亮片段的ID
  currentMarkId: string;
  // 取消标注按钮是否可见
  visible: 'visible' | 'hidden';
  // 取消标注按钮定位left值
  left: number;
  // 取消标注按钮定位top值
  top: number;
  labelList: lableItem[];
  labelVisible: boolean;
  markLabledList: lableItem[];
  deleteTipLeft: number;
  deleteTipTop: number;
  deleteMarkId: string;
};

class HighLighter extends React.Component<Props, State> {
  highlighterContainer: any = null;
  store = new LocalStore();

  state: State = {
    currentMarkId: '',
    visible: 'hidden',
    left: 0,
    top: 0,
    // 标签列表
    labelList: [
      {
        labelId: 1,
        labelName: '项目名称',
        labelColor: '#531dab',
      },
      {
        labelId: 2,
        labelName: '发布日期',
        labelColor: '#595959',
      },
      {
        labelId: 3,
        labelName: '结束日期',
        labelColor: '#1890ff',
      },
      {
        labelId: 4,
        labelName: '项目参与人',
        labelColor: '#c41d7f',
      },
    ],
    labelVisible: false,
    // 已经打过标签的列表
    markLabledList: [],
    deleteTipLeft: 0,
    deleteTipTop: 0,
    deleteMarkId: '',
  };

  componentDidMount() {
    const { handleChange } = this.props;
    const root = document.getElementById('highlight-container');

    const highlighter = new Highlighter({
      // 被标注的范围
      $root: root,
      // 包裹标注片段的标签
      wrapTag: 'span',
      // 不进行标注的元素
      exceptSelectors: ['.remove-tip', 'pre', 'code', 'ul'],
    });

    this.highlighterContainer = highlighter;

    highlighter.run();

    const log = console.log.bind(console, '[highlighter]');

    function getPosition($node) {
      const offset = {
        top: 0,
        left: 0,
      };

      offset.top = $node.offsetTop;
      offset.left = $node.offsetLeft;
      return offset;
    }

    /**
     * highlighter event listener
     */
    highlighter
      .on(Highlighter.event.CLICK, ({ id }) => {
        const position = getPosition(highlighter.getDoms(id)[0]);
        this.setState({
          left: position.left,
          top: position.top,
          labelVisible: !this.state.labelVisible,
          currentMarkId: id,
        });
      })
      .on(Highlighter.event.HOVER, ({ id }) => {
        const position = getPosition(highlighter.getDoms(id)[0]);

        this.setState({
          deleteTipLeft: position.left,
          deleteTipTop: position.top,
          visible: 'visible',
          deleteMarkId: id,
        });
        highlighter.addClass('highlight-wrap-hover', id);
      })
      .on(Highlighter.event.HOVER_OUT, ({ id }) => {
        highlighter.removeClass('highlight-wrap-hover', id);
        this.setState({ visible: 'hidden' });
      })
      .on(Highlighter.event.CREATE, ({ sources }) => {
        // 需要先进行标记
        this.store.save(sources);
      })
      .on(Highlighter.event.REMOVE, ({ ids }) => {
        ids.forEach(id => this.store.remove(id));
        handleChange();
      });

    const storeInfos = this.store.getAll();
    storeInfos.forEach(({ startMeta, endMeta, text, id, extra }: any) => {
      highlighter.fromStore(startMeta, endMeta, text, id, extra);
    });

    handleChange();

    root?.addEventListener(
      'click',
      event => {
        const $ele: any = event.target;
        const { currentMarkId } = this.state;
        const markElement = document.querySelectorAll(
          `[data-highlight-id='${currentMarkId}']`,
        );
        // 点击空白地方关闭下拉菜单
        if (
          $ele !== markElement[0] &&
          !$ele?.parentNode.classList.contains('label-container')
        ) {
          this.setState({ labelVisible: false });
        }
      },
      false,
    );
  }

  handleDelete = () => {
    const { deleteMarkId } = this.state;

    this.highlighterContainer.remove(deleteMarkId);
    this.highlighterContainer.removeClass('highlight-wrap-hover', deleteMarkId);
    this.setState({ visible: 'hidden' });
  };

  handleVisible = (visible: boolean) => {
    const { deleteMarkId } = this.state;

    if (visible) {
      this.highlighterContainer.addClass('highlight-wrap-hover', deleteMarkId);
      this.setState({ visible: 'visible' });
    } else {
      this.highlighterContainer.removeClass(
        'highlight-wrap-hover',
        deleteMarkId,
      );
      this.setState({ visible: 'hidden' });
    }
  };

  handleChooselabel = (lableInfo: lableItem) => event => {
    const { handleChange } = this.props;
    const { currentMarkId, top, left } = this.state;
    // 给标记的文档加标签、颜色、位置信息
    const extra = {
      ...lableInfo,
      top,
      left,
    };

    const markInfo = { ...this.store.get(currentMarkId), extra };
    this.store.save(markInfo);

    setTimeout(() => {
      this.setState({ labelVisible: !this.state.labelVisible });
    }, 100);

    handleChange();
  };

  render() {
    const { highLighterContainerEle } = this.props;
    const {
      left,
      top,
      visible,
      labelList,
      labelVisible,
      deleteTipLeft,
      deleteTipTop,
    } = this.state;
    const markList = this.store.getAll().filter(item => item.extra);

    return (
      <div id="highlight-container" className={styles.container}>
        {highLighterContainerEle}

        <div
          className="tip-container"
          style={{
            top: `${deleteTipTop - 31}px`,
            left: `${deleteTipLeft}px`,
            visibility: visible,
            position: 'absolute',
          }}
          onClick={this.handleDelete}
          onMouseOver={() => this.handleVisible(true)}
          onMouseOut={() => this.handleVisible(false)}
        >
          <div className="remove-tip">删除</div>
          <div className="tip-bottom" />
        </div>

        <ul
          className="label-container"
          style={{
            top: `${top}px`,
            left: `${left}px`,
            visibility: labelVisible ? 'visible' : 'hidden',
          }}
        >
          {labelList.map(item => (
            <li key={item.labelId} onClick={this.handleChooselabel(item)}>
              {item.labelName}
            </li>
          ))}
        </ul>

        {markList.map(item => (
          <div
            key={item.id}
            className="lable-item"
            style={{
              top: `${item.extra.top + 17}px`,
              left: `${item.extra.left}px`,
              position: 'absolute',
              backgroundColor: `${item.extra.labelColor}`,
            }}
          >
            {item.extra.labelName}
          </div>
        ))}
      </div>
    );
  }
}

export default HighLighter;
