/** @format */

import React, { Component } from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import styles from './editor.module.less'
import { getHeight } from '@utils/index'

interface IEditorProps {}
interface IEditorState {
    editorState: {}
    outputHTML: string
    height: number
}

export default class EditorView extends Component<IEditorProps, IEditorState> {
    constructor(props) {
        super(props)
        this.state = {
            editorState: BraftEditor.createEditorState(''),
            outputHTML: '',
            height: 260,
        }
    }
    componentDidMount() {
        let _h = getHeight(100) - document.getElementsByClassName('bf-controlbar')[0].clientHeight
        this.setState({
            height: _h,
        })
    }
    handleChange(editorState) {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML(),
        })
    }
    render() {
        const { editorState, height } = this.state
        return (
            <BraftEditor
                contentStyle={{ height }}
                className={styles['editor-wrap']}
                value={editorState}
                onChange={this.handleChange.bind(this)}
            />
        )
    }
}
