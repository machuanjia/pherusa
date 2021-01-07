/** @format */

export type AppState = {
  token: string;
  permissions: string[];
  roles: string[];
  routers: Record<string, unknown>[];
  flattenRouters: Record<string, unknown>[];
  warning: string;
  id: string;
  activeNav: Record<string, unknown>;
};

export type AppAction = {
  type: string;
  token?: string;
  permissions?: string[];
  roles?: string[];
  routers?: Record<string, unknown>[];
  flattenRouters?: Record<string, unknown>[];
  warning?: string;
  id?: string;
  activeNav?: Record<string, unknown>;
};

export type DispatchType = (args: AppAction) => AppAction;
