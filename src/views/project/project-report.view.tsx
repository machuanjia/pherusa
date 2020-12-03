/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent, SimpleLayoutComponent } from '@components/index'
import { Button } from 'laiye-antd'

interface IProjectReportState {}
interface IProjectReportProps {
  route?: {
    component: {}
    meta: {
      key?: string
      name?: string
    }
    path: string
  }
}

export default class ProjectReportView extends Component<IProjectReportProps, IProjectReportState> {
  render() {
    const route = this.props.route
    return (
      <ContentLayoutComponent>
        <Fragment key="title">{route.meta.name}</Fragment>
        <Fragment key="main">
          <SimpleLayoutComponent>
            <Fragment key="desc">
              科学、合理的商机报备，保证合作伙伴利益最大化！
              为了维护每一个来也科技合作伙伴的商机权益，保持商机的有效性及唯一性，获取相应的商机资源支持，我们鼓励您在产生商机的第一时间进行项目报备。
            </Fragment>
            <Fragment key="action">
              <a
                href="https://www.fxiaoke.com/XV/Home/Index?upstreamEa=zhulilaiye&fsAppId=FSAID_11490f80#prm/list/=/AccountObj "
                target="_blank"
                rel="noopener noreferrer">
                <Button type="primary">报备客户</Button>
              </a>
              <a
                href="https://www.fxiaoke.com/XV/Home/Index?upstreamEa=zhulilaiye&fsAppId=FSAID_11490f80#prm/list/=/NewOpportunityObj"
                target="_blank"
                rel="noopener noreferrer">
                <Button type="primary" className="m-l-12">
                  报备商机
                </Button>
              </a>
            </Fragment>
            <Fragment key="graphic">
              <img alt="项目报备" src="https://cdn.wul.ai/official/hestia/report.jpg" />
            </Fragment>
          </SimpleLayoutComponent>
        </Fragment>
      </ContentLayoutComponent>
    )
  }
}
