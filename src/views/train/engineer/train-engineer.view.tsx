/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent, SimpleLayoutComponent } from '@components/index'
import { Button } from 'laiye-antd'
import TrainEngineerInvationComponent from './train-engineer-invatation.component'

interface ITrainEngineerState {
    isVisible: boolean
}
interface ITrainEngineerProps {
    route?: {
        component: {}
        meta: {
            key?: string
            name?: string
        }
        path: string
    }
}

export default class TrainEngineerView extends Component<ITrainEngineerProps, ITrainEngineerState> {
    constructor(props) {
        super(props)
        this.state = {
            isVisible: false,
        }
    }

    getInvitation() {
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
                            UiBot 工程师认证分为初级、中级和高级。初级和中级认证采用在线答题、自动判卷的方式，面向
                            所有人开放。 高级认证采用实战开发、文档撰写、使用 UiBot Commander 和 UiBot Worker
                            进行任务编排的形 式，并且由人工判卷。通常需要五个工作日完成答题，还需要五个工作日判定结果。
                            高级认证仅向来也科技合作伙伴开放，您需要提前申请邀请码，才能有资格参加高级认证。
                        </Fragment>
                        <Fragment key="action">
                            <a
                                href="https://academy.uibot.com.cn/certificate"
                                target="_blank"
                                rel="noopener noreferrer">
                                <Button className="m-r-12" type="primary">
                                    初级认证
                                </Button>
                            </a>
                            <a
                                href="https://academy.uibot.com.cn/certificate"
                                target="_blank"
                                rel="noopener noreferrer">
                                <Button className="m-r-12" type="primary">
                                    中级认证
                                </Button>
                            </a>
                            <a
                                href="https://academy.uibot.com.cn/certificate"
                                target="_blank"
                                rel="noopener noreferrer">
                                <Button className="m-r-12" type="primary">
                                    高级认证
                                </Button>
                            </a>
                            <Button onClick={this.getInvitation.bind(this)}>申请高级认证邀请码</Button>
                            <TrainEngineerInvationComponent visible={isVisible} />
                        </Fragment>
                        <Fragment key="graphic">
                            <img alt="UiBot工程师认证" src="https://cdn.wul.ai/official/hestia/engineer.jpg" />
                        </Fragment>
                    </SimpleLayoutComponent>
                </Fragment>
            </ContentLayoutComponent>
        )
    }
}
