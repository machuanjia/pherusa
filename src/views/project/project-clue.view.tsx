/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent, SimpleLayoutComponent } from '@components/index'
import { Button } from 'laiye-antd'

interface IProjectClueState {}

interface IProjectClueProps {
    route?: {
        component: {}
        meta: {
            key?: string
            name?: string
        }
        path: string
    }
}

export default class ProjectClueView extends Component<IProjectClueProps, IProjectClueState> {
    render() {
        const route = this.props.route
        return (
            <ContentLayoutComponent>
                <Fragment key="title">{route.meta.name}</Fragment>
                <Fragment key="main">
                    <SimpleLayoutComponent>
                        <Fragment key="desc">
                            来也科技为您牵线！
                            全新的来也科技合作伙伴计划，将为您提供有效的客户推广支持，助力您的客户成功迈入“RPA+AI”时代。我们将与您一路相随，祝愿您把握每一条线索，获得巨大成功。
                        </Fragment>
                        <Fragment key="action">
                            <Button type="primary">跟进线索</Button>
                        </Fragment>
                        <Fragment key="graphic">
                            <img alt="项目线索" src="https://cdn.wul.ai/official/hestia/clue.jpg" />
                        </Fragment>
                    </SimpleLayoutComponent>
                </Fragment>
            </ContentLayoutComponent>
        )
    }
}
