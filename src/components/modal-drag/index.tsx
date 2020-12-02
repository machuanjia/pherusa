/** @format */

import DragM from 'dragm'
import React, { Component } from 'react'
import style from './modal-drag.module.less'

interface IModalDragProps {
    title: any
    selector: string
}

interface IModalDragState {}

export default class ModalDragComponent extends Component<IModalDragProps, IModalDragState> {
    modalDom: any = {}
    updateTransform = transformStr => {
        this.modalDom.style.transform = transformStr
    }
    componentDidMount() {
        this.modalDom = document.getElementsByClassName(this.props.selector || 'ant-modal-wrap')[0]
    }
    render() {
        const { title } = this.props
        return (
            <DragM updateTransform={this.updateTransform}>
                <div className={style['modal-drag-title']}>{title}</div>
            </DragM>
        )
    }
}
