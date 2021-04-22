/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-04-22 18:51:48
 * @LastEditors: D.Y
 * @FilePath: /pherusa/src/interfaces/app.ts
 * @Description: 
 */

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

