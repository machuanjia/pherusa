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
// import 'laiye-antd/dist/antd.less'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

ReactDOM.render(
  <Provider store={store}>
    <Helmet>
      <title>{APP_CONFIGRATION.env.title}</title>
    </Helmet>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
