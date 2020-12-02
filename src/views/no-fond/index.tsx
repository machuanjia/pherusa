/** @format */

import React from 'react'
import styles from './no-font.module.less'

export default () => (
  <div className={styles['error-wrap']}>
    <a href='/' className='form-go-banner' />
    <img src="https://cdn.wul.ai/official/img/officialLogo.png" className="nav-logo" alt="logo" />
    <div className='global-medially flex-c img-wrap'>
      <img src="https://cdn.wul.ai/official/img/404.png" alt="error.png"/>
    </div>
  </div>
)
