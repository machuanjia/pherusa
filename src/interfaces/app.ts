/*
 * @Author: D.Y
 * @Date: 2021-02-04 15:27:20
 * @LastEditTime: 2021-04-28 13:34:58
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
  id: string;
  isMicro: boolean;
};

export type AppAction = {
  type: string;
  token?: string;
  permissions?: string[];
  roles?: string[];
  routers?: Record<string, unknown>[];
  flattenRouters?: Record<string, unknown>[];
  id?: string;
  isMicro?: boolean
};

