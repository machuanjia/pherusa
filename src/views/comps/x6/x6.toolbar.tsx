/** @format */

import { Toolbar } from '@antv/x6-react-components/es/toolbar'

import { Icon } from 'laiye-antd'
import React, { Component } from 'react'

const Item = Toolbar.Item
const Group = Toolbar.Group
interface IX6ToolbarProps {
  xe: any
}
interface IX6ToolbarState {}

export default class X6ToolbarComponent extends Component<IX6ToolbarProps, IX6ToolbarState> {
  private xe
  constructor(props) {
    super(props)
    this.xe = this.props.xe
  }
  onClick(name: string) {
    this.xe[name] && this.xe[name]()
  }
  render() {
    return (
      <Toolbar size={'big'} onClick={this.onClick.bind(this)} extra={<span></span>}>
        <Group>
          <Item name="zoomIn" tooltip="Zoom In (Cmd +)" icon={<Icon type="zoom-in" />} />
          <Item name="zoomOut" tooltip="Zoom Out (Cmd -)" icon={<Icon type="zoom-out" />} />
        </Group>
        <Group>
          <Item name="undo" tooltip="Undo (Cmd + Z)" icon={<Icon type="undo" />} />
          <Item name="redo" tooltip="Redo (Cmd + Shift + Z)" icon={<Icon type="redo" />} />
        </Group>
        <Group>
          <Item name="delete" icon={<Icon type="delete" />} disabled={true} tooltip="Delete (Delete)" />
        </Group>
        <Group>
          <Item name="bold" icon={<Icon type="bold" />} active={true} tooltip="Bold (Cmd + B)" />
          <Item name="italic" icon={<Icon type="italic" />} tooltip="Italic (Cmd + I)" />
          <Item name="strikethrough" icon={<Icon type="strikethrough" />} tooltip="Strikethrough (Cmd + Shift + x)" />
          <Item name="underline" icon={<Icon type="underline" />} tooltip="Underline (Cmd + U)" />
        </Group>
      </Toolbar>
    )
  }
}
