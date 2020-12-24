/** @format */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Trans } from 'react-i18next'
import { connect } from 'react-redux'
import { addArticle } from '@stores/article/article.actions'
import i18n from 'i18next'

class About extends Component<any, any> {
  addNewArticle = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.onAdd({
      id: Math.random(),
      title: 'aaaaa',
      body: 'bbbbb',
    })
  }
  render() {
    i18n.on('languageChanged', e => {
      console.log('==国际化变了====')
      console.log(e)
    })
    console.log(i18n.t('actions.ok'))
    // i18n.changeLanguage('zh-cn')
    // console.log(i18n.t('actions.ok'))
    const list = this.props.list
    return (
      <div>
        <button onClick={this.addNewArticle.bind(this)}>add</button>
        {list.map((item: any) => {
          return (
            <div key={item.id}>
              {item.id} - {item.name} - {item.body}
            </div>
          )
        })}
        <Helmet>
          <title>关于-合作伙伴</title>
        </Helmet>
        <Trans i18nKey="actions.ok"></Trans>
        <p>this is about page</p>
        <Link to="/">goto Home</Link>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    onAdd: (article: any) => {
      dispatch(addArticle(article))
    },
  }
}

const mapStateToProps = (state: any) => {
  return {
    list: state.article.articles,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(About)
