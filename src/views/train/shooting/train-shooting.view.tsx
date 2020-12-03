/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent, SimpleLayoutComponent } from '@components/index'
import { Button } from 'laiye-antd'
import TrainShootingCodeComponent from './train-shooting-code.component'

interface ITrainShootingState {
  isVisible: boolean
}
interface ITrainShootingProps {
  route?: {
    component: {}
    meta: {
      key?: string
      name?: string
    }
    path: string
  }
}

export default class TrainShootingView extends Component<ITrainShootingProps, ITrainShootingState> {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
    }
  }
  getCode() {
    this.setState({
      isVisible: true,
    })
  }
  render() {
    const route = this.props.route
    const { isVisible } = this.state
    return (
      <ContentLayoutComponent>
        <Fragment key="title">{route.meta.name}</Fragment>
        <Fragment key="main">
          <SimpleLayoutComponent>
            <Fragment key="desc">
              在飞行员的训练过程中，不仅需要进行理论学习和实际飞行，还有一个很重要的环节是飞行模拟器。使用飞行模拟器，可训练飞行员处理各种飞机故障的能力，如发动机故障、液压或电气系统失灵、仪表失常等等。从而在实际飞行中遇到类似问题，不至于措手不及。
              在UiBot的开发过程中，您也会遇到各种各样的“疑难杂症”。例如在自动化操作用Java编写的应用程序时，可能需要手动安装UiBot的Java插件，等等。这些“疑难杂症”，平时未必有机会见到，但如果在项目中遇到，难免手忙脚乱，耽误项目进度。
              UiBot靶场的作用类似于“飞行模拟器”，我们把一些典型的实践场景编制成精心设计的题目，供您进行实际的训练。通过训练后，面对一些常见的小麻烦就不在话下了。
              UiBot靶场需要使用“训练码”才能进行训练，您每天可以申请3个训练码。每个训练码可以使用两个小时，时间结束后，训练码即作废，需要重新申请。
              UiBot靶场的训练设备有限，每个设备在同一时间只能有一个人使用。如果设备全部被占用，即使您持有“训练码”，也需要等待设备空闲后，方可进行练习。
            </Fragment>
            <Fragment key="action">
              <Button onClick={this.getCode.bind(this)}>申请训练码</Button>
              <a href="http://training-field.uibot.com.cn" target="_blank" rel="noopener noreferrer">
                <Button type="primary" className="m-l-24">
                  开始训练
                </Button>
              </a>
              <TrainShootingCodeComponent visible={isVisible} />
            </Fragment>
            <Fragment key="graphic">
              <img alt="UiBot工程师认证" src="https://cdn.wul.ai/official/hestia/shooting.jpg" />
            </Fragment>
          </SimpleLayoutComponent>
        </Fragment>
      </ContentLayoutComponent>
    )
  }
}
