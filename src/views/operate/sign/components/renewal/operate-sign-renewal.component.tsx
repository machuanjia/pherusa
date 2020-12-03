/** @format */

import React, { Component, Fragment, ReactInstance } from 'react'
import { Steps, Button } from 'laiye-antd'
import styles from '../../operate-sign.module.less'
import OperateSignRenewStep1Component from './step1/operate-sign-renewal-step1.component'
import OperateSignRenewStep2Component from './step2/operate-sign-renewal-step2.component'
import OperateSignRenewStep3Component from './step3/operate-sign-renewal-step3.component'
import OperateSignRenewStep4Component from './step4/operate-sign-renewal-step4.component'
import OperateSignRenewStep5Component from './step5/operate-sign-renewal-step5.component'

interface IOperateSignRenewalProps {
  entity: any
}
interface IOperateSignRenewalState {
  entity: any
  current: number
}

export default class OperateSignRenewComponent extends Component<IOperateSignRenewalProps, IOperateSignRenewalState> {
  stepRef1: ReactInstance
  stepRef2: ReactInstance
  stepRef3: ReactInstance
  stepRef4: ReactInstance
  stepRef5: ReactInstance
  constructor(props) {
    super(props)
    this.state = {
      entity: this.props.entity,
      current: 0,
    }
  }
  // onChange = current => {
  //     console.log('onChange:', current)
  //     this.setState({ current })
  // }
  getStep(step: number) {
    step++
    switch (step) {
      case 1:
        return (
          <OperateSignRenewStep1Component
            ref={ref => {
              this.stepRef1 = ref
            }}
          />
        )
      case 2:
        return (
          <OperateSignRenewStep2Component
            ref={ref => {
              this.stepRef2 = ref
            }}
          />
        )
      case 3:
        return (
          <OperateSignRenewStep3Component
            ref={ref => {
              this.stepRef3 = ref
            }}
          />
        )
      case 4:
        return (
          <OperateSignRenewStep4Component
            ref={ref => {
              this.stepRef4 = ref
            }}
          />
        )
      case 5:
        return (
          <OperateSignRenewStep5Component
            ref={ref => {
              this.stepRef5 = ref
            }}
          />
        )
    }
  }
  next() {
    const current = this.state.current + 1
    this.setState({ current })
    this.save()
  }

  prev() {
    const current = this.state.current - 1
    this.setState({ current })
  }
  save() {
    const ref: any = this[`stepRef${this.state.current + 1}`]
    ref.save()
  }
  getButtons(current) {
    const prev = (
      <Button type="primary" className="m-l-12" onClick={this.prev.bind(this)}>
        上一步
      </Button>
    )
    const next = (
      <Button type="primary" className="m-l-12" onClick={this.next.bind(this)}>
        下一步
      </Button>
    )
    const submit = (
      <Button type="primary" className="m-l-12" onClick={this.save.bind(this)}>
        提交申请
      </Button>
    )
    let bts = null
    if (current === 0) {
      bts = next
    } else if (current === 3) {
      bts = (
        <Fragment>
          {prev}
          {submit}
        </Fragment>
      )
    } else {
      bts = (
        <Fragment>
          {prev}
          {next}
        </Fragment>
      )
    }
    return <Fragment>{bts}</Fragment>
  }
  render() {
    const { Step } = Steps
    const { current } = this.state
    // "\e6b6"
    // font-family: "iconfont" !important;
    return (
      <div className={styles['renewal-wrap']}>
        <div className={styles['renewal-header']}>
          <Steps current={current}>
            <Step title="公司信息" />
            <Step title="问卷调查" />
            <Step title="签署协议" />
            <Step title="信息确认" />
            <Step title="提交申请" />
          </Steps>
        </div>
        <div className={styles['renewal-body']}>{this.getStep(current)}</div>
        <div className={styles['renewal-footer']}>{this.getButtons(current)}</div>
      </div>
    )
  }
}
