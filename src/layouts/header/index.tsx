/** @format */

import { Component } from 'react'
import React from 'react'

interface IHeaderProps {}

interface IHeaderState {}

export default class HeaderComponent extends Component<IHeaderState, IHeaderProps> {
  componentDidMount() {
    // @ts-ignore
    new LaiyePublic({
      mode: 'dev',
      ativeSrc: 'news',
      navCurretElement: document.getElementById('header'),
    })
  }
  render() {
    return <div id="header"></div>
  }
}
