/** @format */

import React, { Component, Fragment } from 'react'
import { ContentLayoutComponent } from '@components/index'
import { BpmnEditorComponent } from '@components/index'

export default class BpmnView extends Component {
  render() {
    return (
      <ContentLayoutComponent>
        <Fragment key="title">业务流程</Fragment>
        <Fragment key="main">
          <BpmnEditorComponent></BpmnEditorComponent>
        </Fragment>
      </ContentLayoutComponent>
    )
  }
}
