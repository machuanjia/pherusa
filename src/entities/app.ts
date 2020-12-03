/** @format */

export type AppState = {
  token: string
  permissions: string[]
  roles: string[]
}

export type AppAction = {
  type: string
  token?: string
  permissions?: string[]
  roles?: string[]
}

export type DispatchType = (args: AppAction) => AppAction
