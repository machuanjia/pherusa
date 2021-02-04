/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-02-04 15:56:30
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/interfaces/article.ts
 * @Description: 
 */

export type IArticle = {
  id: number
  title: string
  body: string
}

export type ArticleState = {
  articles: IArticle[]
}

export type ArticleAction = {
  type: string
  article: IArticle
}
