/** @format */

import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { ContentLayoutComponent } from '@components/index'
import { Button } from 'laiye-antd'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { Prompt } from 'react-router-dom'

interface IProductDocProps {
  route?: {
    component: {}
    meta: {
      key?: string
      name?: string
    }
    path: string
  }
}
interface IProductDocState {
  isEdit: boolean
  editorState: {}
  outputHTML: string
  height: number
}

export default class ProductDocView extends Component<IProductDocProps, IProductDocState> {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false,
      editorState: BraftEditor.createEditorState(''),
      outputHTML: '',
      height: 260,
    }
  }
  componentDidMount() {
    this.setState({
      height: ReactDOM.findDOMNode(this.refs.contentMain)['clientHeight'] - 246,
      editorState: BraftEditor.createEditorState(`<p>伴随经济下行、劳动力成本不断提升，电商业务的精细管理已成为电商企业越来越重视的手段。
            无论是商品、订单、营销，还是采购、库存、售后，或是物流、财务管理，电商企业的很多业务流程涉及信息收集、数据迁移、表单填写、票据统计等重复、繁琐的操作。
            特别是在商品信息检查、客服问题处理、竞对同行分析、官方活动报名、客户催好评、各平台店铺新品上架及老品维护等等具体事项上，大量重复繁琐且易出错的工作，往往耗费大量的人力和时间。
            过去的全人工铺开模式已无法应对这个多变的时代。成本与效率，是电商企业永远绕不过去的话题。
            转眼，一年一度的双11即将来临，电商卖家该如何抓住机会？</p>`),
      outputHTML: `伴随经济下行、劳动力成本不断提升，电商业务的精细管理已成为电商企业越来越重视的手段。
            无论是商品、订单、营销，还是采购、库存、售后，或是物流、财务管理，电商企业的很多业务流程涉及信息收集、数据迁移、表单填写、票据统计等重复、繁琐的操作。
            特别是在商品信息检查、客服问题处理、竞对同行分析、官方活动报名、客户催好评、各平台店铺新品上架及老品维护等等具体事项上，大量重复繁琐且易出错的工作，往往耗费大量的人力和时间。
            过去的全人工铺开模式已无法应对这个多变的时代。成本与效率，是电商企业永远绕不过去的话题。
            转眼，一年一度的双11即将来临，电商卖家该如何抓住机会？`,
    })
  }
  handleChange(editorState) {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML(),
    })
  }
  setEdit() {
    this.setState({
      isEdit: true,
    })
    setTimeout(() => {
      let _h =
        ReactDOM.findDOMNode(this.refs.contentMain)['clientHeight'] -
        136 -
        document.getElementsByClassName('bf-controlbar')[0].clientHeight
      this.setState({
        height: _h,
      })
    })
  }
  save() {
    this.setState({
      isEdit: false,
    })
  }
  cancel() {
    this.setState({
      isEdit: false,
    })
  }
  render() {
    const route = this.props.route
    const { editorState, outputHTML, isEdit, height } = this.state
    const main = isEdit ? (
      <BraftEditor
        contentStyle={{ height }}
        className="border"
        value={editorState}
        onChange={this.handleChange.bind(this)}
      />
    ) : (
      <div dangerouslySetInnerHTML={{ __html: outputHTML }} />
    )
    const actions = isEdit ? (
      <Fragment>
        <Button type="primary" icon="save" onClick={this.save.bind(this)}>
          保存
        </Button>
        <Button className="m-l-12" onClick={this.cancel.bind(this)}>
          取消
        </Button>
      </Fragment>
    ) : (
      <Button type="primary" icon="edit" onClick={this.setEdit.bind(this)}>
        编辑
      </Button>
    )
    return (
      <ContentLayoutComponent ref="contentMain">
        <Fragment key="title">{route.meta.name}</Fragment>
        <Fragment key="actions">{actions}</Fragment>
        <Fragment key="main">
          <Prompt when={isEdit} message="还未保存，确认要离开吗?" />
          {main}
        </Fragment>
      </ContentLayoutComponent>
    )
  }
}
