/*
 * @Author: xulijing
 * @Date: 2020-08-03 14:32:14
 * @LastEditTime: 2021-02-25 16:21:16
 * @FilePath: /pherusa/src/views/mark-txt/index.tsx
 */
import React from 'react';
import styles from './index.module.less';
import HighLighter from './components/Highlighter/index';
import LocalStore from './components/Highlighter/store';

type Props = {
  // 需要划词的区域
  highLighterContainer: JSX.Element[];
  handleChange: () => void;
};

const store = new LocalStore();

class HighLighterContainer extends React.Component<Props> {
  state = {
    markDataText: `
      回到台北已经二十多天，在这短短的时间里，我收到无数过去与我通信的读者、我教过的学生、以及许许多多新朋友的来信与电话，我也在台北街头看见自己的新书挤在一大堆花花绿绿的书刊里向我扮着顽皮的鬼脸。
      每当我收到由各方面转来的你们的来信时，我在这一封封诚意的信里，才看出了我自己的形象，才知道三毛有这么多不相识的朋友在鼓励着她。我多么希望每一封信都细细的回答你们，因为我知道，每一个写信给我的人，在提笔时，也费了番心思和时间来表示对我的关怀。
      我怎么能够看见你们诚意的来信，知道你们一定在等着我的回音，而那一封封的信都如石沉大海，没有回声。请无数写信给我的朋友了解我，三毛不是一个没有感情也没有礼貌的人。离开家国那么久了，台北的亲情友情，整整的占据了我，我尽力愿意把我自己的时间，分给每一个关怀我的朋友，可惜的是，我一天也只能捉住二十四小时。生活突然的忙碌热闹，使我精神上兴奋而紧张，体力上透支再透支，而内心的宁静却已因为这些感人的真情流露起了很大的波澜。虽然我努力在告诉自己，我要完完全全享受我在祖国的假期，游山玩水，与父母亲闲话家常。事实上，我每日的生活，已成了时间的奴隶，我日日夜夜的追赶着它，而仿佛永远不能在这件事上得到释放。`,
    markData: [],
  };

  renderPreMark = () => {
    const { markDataText } = this.state;
    return <p className={styles.markText}>{markDataText}</p>;
  };

  handleChange = () => {
    const highLighterData = store.getAll();
    const _markData: any = [];

    highLighterData
      .filter(item => item.extra)
      .forEach(({ startMeta, endMeta, text, extra }: any) => {
        const { labelId, labelName } = extra;

        _markData.push({
          text,
          startIndex: startMeta.textOffset,
          endIndex: endMeta.textOffset,
          labelId,
          labelName,
        });
      });

    this.setState({ markData: [..._markData] });
  };

  render() {
    const { markData } = this.state;
    return (
      <div>
        <HighLighter
          highLighterContainerEle={this.renderPreMark()}
          handleChange={this.handleChange}
        />

        <div className={`${styles.show} ${styles.firstShow}`}>
          <dt>标记内容</dt>
          <dt>起始坐标</dt>
          <dt>终止坐标</dt>
          <dt>标签ID</dt>
          <dt>标签名称</dt>
        </div>

        {markData.map((item: any, index) => (
          <div key={`${item}-${index}`} className={styles.show}>
            <dt>{item.text}</dt>
            <dt>{item.startIndex}</dt>
            <dt>{item.endIndex}</dt>
            <dt>{item.labelId}</dt>
            <dt>{item.labelName}</dt>
          </div>
        ))}
      </div>
    );
  }
}

export default HighLighterContainer;
