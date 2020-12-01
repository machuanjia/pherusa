/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent, SimpleLayoutComponent } from '@components/index'
import { Button } from 'laiye-antd'

interface ITrainCenterProps {
    route?: {
        component: {}
        meta: {
            key?: string
            name?: string
        }
        path: string
    }
}
interface ITrainCenterState {}

export default class TrainCenterView extends Component<ITrainCenterProps, ITrainCenterState> {
    render() {
        const route = this.props.route
        return (
            <ContentLayoutComponent>
                <Fragment key="title">{route.meta.name}</Fragment>
                <Fragment key="main">
                    <SimpleLayoutComponent>
                        <Fragment key="desc">
                            合作伙伴主要面向客户进行RPA流程演示, 流程开发, 实施交付, 后期维护等工作。
                            合作伙伴培训中心提供了包含UiBot Creator、UiBot Worker、UiBot Commander、UiBot Mage、流程分析师等培训课程。 并对不同行业场景, 比如: 金融,零售,能源,房地产等行业提供了丰富的解决方案。
                            针对不同合作伙伴需求, 培训中心还提供产品和技术支持, 线上线下培训赋能, 业务支持,品牌支持。入驻老师均由各行业一线RPA实施专家, 项目经理组成。
                            目前我们已为合作伙伴培训了1000+RPA实施工程师, 如果您还未成为我们的合作伙伴, 请联系渠道经理。
                        </Fragment>
                        <Fragment key="action">
                            <a href="http://laiye.yunxuetang.cn" target="_blank" rel="noopener noreferrer">
                                <Button type="primary">开始训练</Button>
                            </a>
                        </Fragment>
                        <Fragment key="graphic">
                            <img alt="合作伙伴培训中心" src="https://cdn.wul.ai/official/hestia/center.jpg" />
                        </Fragment>
                    </SimpleLayoutComponent>
                </Fragment>
            </ContentLayoutComponent>
        )
    }
}
