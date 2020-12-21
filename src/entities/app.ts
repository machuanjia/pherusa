/** @format */

export type AppState = {
  token: string
  permissions: string[]
  roles: string[]
  routers: {}[]
  flattenRouters: {}[]
  warning: string
  id: string
  activeNav: {}
}

export type AppAction = {
  type: string
  token?: string
  permissions?: string[]
  roles?: string[]
  routers?: {}[]
  flattenRouters?: {}[]
  warning?: string
  id?: string
  activeNav?: {}
}

export type DispatchType = (args: AppAction) => AppAction
