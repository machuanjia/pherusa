/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent, SimpleLayoutComponent } from '@components/index'
import { Button } from 'laiye-antd'

interface ITrainInstructorState {}
interface ITrainInstructorProps {
  route?: {
    component: {}
    meta: {
      key?: string
      name?: string
    }
    path: string
  }
}

export default class TrainInstructorView extends Component<ITrainInstructorProps, ITrainInstructorState> {
  render() {
    const route = this.props.route
    return (
      <ContentLayoutComponent>
        <Fragment key="title">{route.meta.name}</Fragment>
        <Fragment key="main">
          <SimpleLayoutComponent>
            <Fragment key="desc">
              RPA项目经常会失败:有的项目在开发阶段能正常工作，而在验收时频繁出现问题，导致无法通过验收;有的项目在交付之后，发现难以维护，导致实施方和客户之间的责任推诿。
              来也科技经过反复调研和探索，根据项目失败的原因，总结了RPA项目的最佳实践，确保流程的规范性、容错性，以及文档的完整性，等等。最大程度的降低项目风险，确保项目周期和质量可控。
              最佳实践很难依靠阅读来学习，只能通过实践来掌握。为此，来也科技设置了“RPA教官”的岗位，由具有丰富实践经验的业务分析师和RPA工程师作为教官，亲赴项目现场带教，手把手给您示范
              RPA项目的最佳实践。 来也科技的RPA教官已经在多个项目上发挥了重要作用，好评度超过90%!
              如果您的项目需要教官的带教，请联系您的渠道经理。
            </Fragment>
            <Fragment key="action">
              <Button type="primary">查看渠道经理联系方式</Button>
            </Fragment>
            <Fragment key="graphic">
              <img alt="RPA项目教官" src="https://cdn.wul.ai/official/hestia/instructor.jpg" />
            </Fragment>
          </SimpleLayoutComponent>
        </Fragment>
      </ContentLayoutComponent>
    )
  }
}
