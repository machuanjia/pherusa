/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-04-28 14:23:16
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/index.tsx
 * @Description:
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Helmet } from 'react-helmet'
import { ConfigProvider } from 'antd'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './public-path'

import store from '@stores/store'
import { history } from '@utils/history'
import '@i18n'
import { getAntdLocal } from '@i18n/index'

import './styles/index.less'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { SET_MICRO } from '@stores/app/app.types'

function render(props: any) {
  const { container } = props
  store.dispatch({
    type: SET_MICRO,
    isMicro: !!container,
  })
  ReactDOM.render(
    <Provider store={store}>
      <Helmet>
        <title>来也科技</title>
      </Helmet>
      <BrowserRouter
        basename={`${container ? '/app' : ''}${process.env.PUBLIC_URL}`}
        history={history}
      >
        <ConfigProvider locale={getAntdLocal()} componentSize="middle">
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </Provider>,
    container ? container.querySelector('#root') : document.querySelector('#root'),
  )
}
// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}

export async function bootstrap() {
  console.log('pherusa app bootstraped')
}

export async function mount(props: any) {
  console.log(props)
  props.onGlobalStateChange((state: any, prev: any) => {
    // state: 变更后的状态; prev 变更前的状态
    // eslint-disable-next-line no-debugger
    console.log('pherusa:', state, prev)
  })

  // props.setGlobalState({
  //   token:'plot'
  // });

  render(props)
}

export async function unmount(props: any) {
  const { container } = props
  // @ts-ignore
  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector('#root') : document.querySelector('#root'),
  )
}

export async function update(props) {
  // eslint-disable-next-line no-debugger
  console.log('update props', props);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
