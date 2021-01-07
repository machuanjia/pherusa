/** @format */

export type IListMixin = {
  data: {}[];
  loading: boolean;
  pagination: {};
  searchAction: () => {};
  openCollection: () => {};
  closeCollection: () => {};
  getList: () => {};
  getRowKey: any;
  collectionCallBack: () => {};
  editEntity: any;
  deleteEntity: any;
  entity: {};
  isCollectionVisible: boolean;
};
