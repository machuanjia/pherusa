/** @format */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Trans } from 'react-i18next'
import { connect } from 'react-redux'
import { addArticle } from '@stores/article/actions'

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
        console.log('=========')
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
