/** @format */
import { Avatar } from 'laiye-antd'
import React, { Component } from 'react'
import styles from './preference.module.less'

export default class PreferenceComponent extends Component {
    constructor(props) {
        super(props)
    }
    render(){
        return(<div className={styles['preference-wrap']}><Avatar style={{ backgroundColor: '#87d068' }} icon="user" /></div>)
    }
}
