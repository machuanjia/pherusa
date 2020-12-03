/** @format */

import React, { Component, Fragment } from 'react'
import { Form, Radio, Checkbox } from 'laiye-antd'
import FieldItemComponent from '@components/field'
import styles from '../../../operate-sign.module.less'
import { map } from 'lodash'

interface IOperateSignRenewalStep1FormProps {
  isEdit: boolean
  changeState: (state: boolean) => {}
  form: any
  getFieldDecorator: any
}
interface IOperateSignRenewalStep1FormState {
  isEdit: boolean
}

class OperateSignRenewalStep1FormComponent extends Component<
  IOperateSignRenewalStep1FormProps,
  IOperateSignRenewalStep1FormState
> {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: props.isEdit,
    }
  }

  componentWillReceiveProps({ isEdit }) {
    this.setState({ isEdit })
  }

  formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  }

  buttonItemLayout = {
    wrapperCol: { span: 8, offset: 4 },
  }

  getItems(arrays) {
    const { getFieldDecorator } = this.props.form
    return arrays ? (
      <Fragment>
        {arrays.map((n: any, index) => {
          return (
            <FieldItemComponent
              key={index}
              name={n.name}
              rule={n.rule}
              type={n.type}
              label={n.label}
              placeholder={n.placeholder}
              value={n.value}
              isEdit={n.isEdit}
              getFieldDecorator={getFieldDecorator}
            />
          )
        })}
      </Fragment>
    ) : null
  }

  getBasicItems() {
    const basicItems = [
      {
        label: '公司名称（法人）',
        name: 'name',
        placeholder: '请输入公司名称（法人）',
        rule: { required: true },
        value: '',
        isEdit: this.state.isEdit,
      },
      {
        label: '法人代表',
        name: 'representative',
        placeholder: '请输入法人代表',
        rule: { required: true },
        value: '',
        isEdit: this.state.isEdit,
      },
      {
        label: '公司地址',
        name: 'address',
        rule: { required: true },
        placeholder: '请输入公司地址',
        value: '',
        isEdit: this.state.isEdit,
      },
      {
        label: '邮  编',
        name: 'postcode',
        rule: { required: true },
        placeholder: '请输入邮编',
        value: '',
        isEdit: this.state.isEdit,
      },
      {
        label: '公司成立时间',
        name: 'start',
        rule: { required: true },
        placeholder: '请输入公司成立时间',
        value: '',
        isEdit: this.state.isEdit,
      },
      {
        label: '公司经营范围',
        name: 'scope',
        rule: { required: true },
        placeholder: '请输入公司经营范围',
        value: '',
        isEdit: this.state.isEdit,
      },
      {
        label: '公司经营项目',
        name: 'project',
        rule: { required: true },
        placeholder: '请输入公司经营项目',
        value: '',
        isEdit: this.state.isEdit,
      },
      {
        label: '您公司最优质客户',
        name: 'bestCustomer',
        rule: { required: true },
        placeholder: '请输入公司最优质客户',
        value: '',
        isEdit: this.state.isEdit,
      },
      {
        label: '项目平均额度',
        name: 'quota',
        rule: { required: true },
        placeholder: '请输入项目平均额度',
        value: '',
        isEdit: this.state.isEdit,
      },
    ]
    return <Fragment> {this.getItems(basicItems)}</Fragment>
  }

  getPartnerLeader() {
    const partnerLeader = [
      {
        label: '合作伙伴负责人姓名',
        name: 'partnerLeaderName',
        placeholder: '请输入姓名',
        rule: { required: true },
        value: '',
        isEdit: this.props.isEdit,
      },
      {
        label: '合作伙伴负责人电话',
        name: 'partnerLeaderPhone',
        placeholder: '请输入电话',
        rule: { required: true, type: 'phone' },
        value: '',
        isEdit: this.props.isEdit,
      },
      {
        label: '合作伙伴负责人邮箱',
        name: 'partnerLeaderEmail',
        placeholder: '请输入邮箱',
        type: 'email',
        rule: { required: true },
        value: '',
        isEdit: this.props.isEdit,
      },
      {
        label: '合作伙伴负责人微信',
        name: 'partnerLeaderWeichat',
        placeholder: '请输入微信',
        rule: { required: true },
        value: '',
        isEdit: this.props.isEdit,
      },
    ]
    return <Fragment> {this.getItems(partnerLeader)}</Fragment>
  }

  getMarketLeader() {
    const marketLeader = [
      {
        label: '市场负责人姓名',
        name: 'marketLeaderName',
        placeholder: '请输入姓名',
        rule: { required: true },
        value: '',
        isEdit: this.props.isEdit,
      },
      {
        label: '市场负责人电话',
        name: 'marketLeaderPhone',
        placeholder: '请输入电话',
        rule: { required: true, type: 'phone' },
        value: '',
        isEdit: this.props.isEdit,
      },
      {
        label: '市场负责人邮箱',
        name: 'marketLeaderEmail',
        placeholder: '请输入邮箱',
        type: 'email',
        rule: { required: true },
        value: '',
        isEdit: this.props.isEdit,
      },
    ]
    return <Fragment> {this.getItems(marketLeader)}</Fragment>
  }

  getBusiness() {
    const businessLeader = [
      {
        label: '商务负责人姓名',
        name: 'businessLeaderName',
        placeholder: '请输入姓名',
        rule: { required: true },
        value: '',
        isEdit: this.props.isEdit,
      },
      {
        label: '商务负责人电话',
        name: 'businessLeaderPhone',
        placeholder: '请输入电话',
        rule: { required: true, type: 'phone' },
        value: '',
        isEdit: this.props.isEdit,
      },
      {
        label: '商务负责人邮箱',
        name: 'businessLeaderEmail',
        placeholder: '请输入邮箱',
        type: 'email',
        rule: { required: true },
        value: '',
        isEdit: this.props.isEdit,
      },
    ]
    return <Fragment> {this.getItems(businessLeader)}</Fragment>
  }

  getTechnical() {
    const technicalLeader = [
      {
        label: '技术负责人姓名',
        name: 'technicalLeaderName',
        placeholder: '请输入姓名',
        rule: { required: true },
        value: '',
        isEdit: this.props.isEdit,
      },
      {
        label: '技术负责人电话',
        name: 'technicalLeaderPhone',
        placeholder: '请输入电话',
        rule: { required: true, type: 'phone' },
        value: '',
        isEdit: this.props.isEdit,
      },
      {
        label: '技术负责人邮箱',
        name: 'technicalLeaderEmail',
        placeholder: '请输入邮箱',
        type: 'email',
        rule: { required: true },
        value: '',
        isEdit: this.props.isEdit,
      },
    ]
    return <Fragment> {this.getItems(technicalLeader)}</Fragment>
  }

  getSales() {
    const salesLeader = [
      {
        label: '销售负责人姓名',
        name: 'salesLeaderName',
        placeholder: '请输入姓名',
        rule: { required: true },
        value: '',
        isEdit: this.props.isEdit,
      },
      {
        label: '销售负责人电话',
        name: 'salesLeaderPhone',
        placeholder: '请输入电话',
        rule: { required: true, type: 'phone' },
        value: '',
        isEdit: this.props.isEdit,
      },
      {
        label: '销售负责人邮箱',
        name: 'salesLeaderEmail',
        placeholder: '请输入邮箱',
        type: 'email',
        rule: { required: true },
        value: '',
        isEdit: this.props.isEdit,
      },
    ]
    return <Fragment> {this.getItems(salesLeader)}</Fragment>
  }

  getPartnerType() {
    const { getFieldDecorator } = this.props.form
    const partners = [
      {
        name: '顾问咨询公司',
        value: '1',
      },
      {
        name: '系统集成商（SI）',
        value: '2',
      },
      {
        name: '独立软件开发商（ISV）',
        value: '3',
      },
      {
        name: '外包公司',
        value: '4',
      },
      {
        name: '用户业务流程自动化',
        value: '5',
      },
      {
        name: '商务',
        value: '6',
      },
      {
        name: '培训',
        value: '7',
      },
      {
        name: '支付',
        value: '8',
      },
      {
        name: '解决方案',
        value: '9',
      },
    ]
    return (
      <Form.Item label="partner" labelCol={{ span: 0 }} wrapperCol={{ span: 12 }}>
        {getFieldDecorator('radio-group')(
          <Radio.Group>
            {partners.map((n: any, index) => {
              return (
                <Radio disabled={!this.state.isEdit} className={styles['item-margin']} key={n.value} value={n.value}>
                  {n.name}
                </Radio>
              )
            })}
          </Radio.Group>,
        )}
      </Form.Item>
    )
  }

  getAdvantageous() {
    const { getFieldDecorator } = this.props.form
    const advantageous = [
      {
        name: '电力',
        value: '0',
      },
      {
        name: '政府',
        value: '1',
      },
      {
        name: '房地产',
        value: '2',
      },
      {
        name: '保险',
        value: '3',
      },
      {
        name: '军人',
        value: '4',
      },
      {
        name: '电商',
        value: '5',
      },
      {
        name: '呼叫中心',
        value: '6',
      },
      {
        name: '互联网',
        value: '7',
      },
      {
        name: '环保',
        value: '8',
      },
      {
        name: '建筑',
        value: '9',
      },
      {
        name: '交通',
        value: '10',
      },
      {
        name: '教育',
        value: '11',
      },
      {
        name: '零售',
        value: '12',
      },
      {
        name: '能源',
        value: '13',
      },
      {
        name: '人力资源',
        value: '14',
      },
      {
        name: '税务',
        value: '15',
      },
      {
        name: '通讯',
        value: '16',
      },
      {
        name: '制造业',
        value: '17',
      },
      {
        name: '医疗',
        value: '18',
      },
      {
        name: '银行',
        value: '19',
      },
      {
        name: '证券',
        value: '20',
      },
      {
        name: '咨询',
        value: '21',
      },
      {
        name: '金融',
        value: '22',
      },
      {
        name: '财税',
        value: '23',
      },
      {
        name: 'IT服务',
        value: '24',
      },
      {
        name: '公共事业',
        value: '25',
      },
      {
        name: '全行业',
        value: '26',
      },
    ]
    return (
      <Form.Item label="advantageous" labelCol={{ span: 0 }} wrapperCol={{ span: 12 }}>
        {getFieldDecorator('checkbox-group', {
          initialValue: ['A', 'B'],
        })(
          <Checkbox.Group style={{ width: '100%' }}>
            {map(advantageous, n => {
              return (
                <Checkbox disabled={!this.state.isEdit} className={styles['item-margin']} value={n.value} key={n.value}>
                  {n.name}
                </Checkbox>
              )
            })}
          </Checkbox.Group>,
        )}
      </Form.Item>
    )
  }

  render() {
    return (
      <Form {...this.formItemLayout} labelAlign="left">
        <div className={styles['renewal-card']}>
          <div className={styles['renewal-card-header']}>基本信息（必填）</div>
          <div className={styles['renewal-card-body']}>{this.getBasicItems()}</div>
        </div>

        <div className={styles['renewal-card']}>
          <div className={styles['renewal-card-header']}>合作伙伴负责人（必填）</div>
          <div className={styles['renewal-card-body']}>{this.getPartnerLeader()}</div>
        </div>

        <div className={styles['renewal-card']}>
          <div className={styles['renewal-card-header']}>市场负责人（必填）</div>
          <div className={styles['renewal-card-body']}>{this.getMarketLeader()}</div>
        </div>

        <div className={styles['renewal-card']}>
          <div className={styles['renewal-card-header']}>商务负责人（必填）</div>
          <div className={styles['renewal-card-body']}>{this.getBusiness()}</div>
        </div>

        <div className={styles['renewal-card']}>
          <div className={styles['renewal-card-header']}>技术负责人（必填）</div>
          <div className={styles['renewal-card-body']}>{this.getTechnical()}</div>
        </div>

        <div className={styles['renewal-card']}>
          <div className={styles['renewal-card-header']}>销售负责人（必填）</div>
          <div className={styles['renewal-card-body']}>{this.getSales()}</div>
        </div>

        <div className={styles['renewal-card']}>
          <div className={styles['renewal-card-header']}>其他信息</div>
          <div className={styles['renewal-card-body']}>
            <div className="text-main bold">合作伙伴类型（单选）</div>
            <div className="p-t-8">{this.getPartnerType()}</div>
            <div className="text-main bold">您公司优势行业（多选）</div>
            <div className="p-t-8">{this.getAdvantageous()}</div>
          </div>
        </div>
      </Form>
    )
  }
}

export default Form.create({ name: 'OperateSignRenewalStep1Form' })(OperateSignRenewalStep1FormComponent) as any
