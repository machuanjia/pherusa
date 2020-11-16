/** @format */

import { Component } from 'react'
import React from 'react'

interface IHeaderProps {}

interface IHeaderState {}

export default class HeaderComponent extends Component<IHeaderState, IHeaderProps> {
    componentDidMount() {
        const header = document.getElementById('header')
        const footer = document.getElementById('footer')

        // @ts-ignore
        new LaiyePublic({
            mode: 'dev',
            ativeSrc: 'news',
            navCurretElement: header,
            footerCurretElement: footer,
        })
    }
    render() {
        return (
            <div>
                <div id="header"></div>
                <div id="footer"></div>
            </div>
        )
    }
}
