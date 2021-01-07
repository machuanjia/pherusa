import DragM from 'dragm';
import React, { Component } from 'react';
import style from './modal-drag.module.less';

type IModalDragProps = {
  title: any;
  selector: string;
};

type IModalDragState = unknown;

export default class ModalDragComponent extends Component<IModalDragProps, IModalDragState> {
  modalDom: any = {};
  updateTransform = (transformStr) => {
    this.modalDom.style.transform = transformStr;
  };
  componentDidMount() {
    const [dom] = document.getElementsByClassName(this.props.selector || 'ant-modal-wrap') as any;
    this.modalDom = dom;
  }
  render() {
    const { title } = this.props;
    return (
      <DragM updateTransform={this.updateTransform}>
        <div className={style['modal-drag-title']}>{title}</div>
      </DragM>
    );
  }
}
