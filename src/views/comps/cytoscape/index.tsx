/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent } from '@components/index'
import { Button } from 'laiye-antd'
import BasicCytoscapeComponent from './components/basic-cytoscape'

import ProdCytoscapeComponent from './components/prod-cytoscape'

interface ICytoscapeProps {}
interface ICytoscapeState {
  current: number
}

export default class CytoscapeView extends Component<ICytoscapeProps, ICytoscapeState> {
  private cytoscapeDemoType = {
    basic: 1,
    styles: 2,
    event: 3,
    layout: 4,
    prod: 5,
  }
  constructor(props) {
    super(props)
    this.state = {
      current: this.cytoscapeDemoType.basic,
    }
  }
  setType(key) {
    this.setState({
      current: this.cytoscapeDemoType[key],
    })
  }
  render() {
    const { current } = this.state
    return (
      <ContentLayoutComponent>
        <Fragment key="left"></Fragment>
        <Fragment key="actions">
          <Button type="primary" className="m-r-12" onClick={this.setType.bind(this, 'basic')}>
            基本用法
          </Button>
          <Button type="primary" className="m-r-12" onClick={this.setType.bind(this, 'styles')}>
            节点样式
          </Button>
          <Button type="primary" className="m-r-12" onClick={this.setType.bind(this, 'event')}>
            事件
          </Button>
          <Button type="primary" className="m-r-12" onClick={this.setType.bind(this, 'layout')}>
            布局
          </Button>
          <Button type="primary" className="m-r-12" onClick={this.setType.bind(this, 'prod')}>
            Prod
          </Button>
        </Fragment>
        <Fragment key="main">
          {current === this.cytoscapeDemoType.basic && <BasicCytoscapeComponent></BasicCytoscapeComponent>}
          {current === this.cytoscapeDemoType.prod && <ProdCytoscapeComponent />}
        </Fragment>
      </ContentLayoutComponent>
    )
  }
}
