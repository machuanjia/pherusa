/** @format */

import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.less'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Helmet } from 'react-helmet'
import '@i18n'
import { Provider } from 'react-redux'
import store from '@stores/store'
import { BrowserRouter } from 'react-router-dom'
import zhCN from 'antd/lib/locale/zh_CN'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import { history } from '@utils/history'
import { ConfigProvider } from 'laiye-antd'
import 'tippy.js/index.css'

ReactDOM.render(
  <Provider store={store}>
    <Helmet>
      <title>来也科技</title>
    </Helmet>
    <BrowserRouter basename={process.env.PUBLIC_URL} history={history}>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
