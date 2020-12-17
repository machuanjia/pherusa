/** @format */

export type AppState = {
  token: string
  permissions: string[]
  roles: string[]
  routers: {}[]
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
  warning?: string
  id?: string
  activeNav?: {}
}

export type DispatchType = (args: AppAction) => AppAction
