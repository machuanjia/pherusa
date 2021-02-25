/*
 * @Author: xulijing
 * @Date: 2020-08-03 14:42:42
 * @LastEditTime: 2021-02-24 20:08:07
 * @FilePath: /pherusa/src/views/mark-txt/components/Highlighter/store.tsx
 */
import { HighlightSource } from 'web-highlighter';

class LocalStore {
  key: string;
  constructor() {
    this.key = 'highlight-mengshou';
  }

  storeToJson() {
    const store = localStorage.getItem(this.key);
    let sources;
    try {
      sources = JSON.parse(store) || [];
    } catch (e) {
      sources = [];
    }
    return sources;
  }

  jsonToStore(stores) {
    localStorage.setItem(this.key, JSON.stringify(stores));
  }

  save(data) {
    const stores = this.storeToJson();
    const map = {};
    let tempData = data
    stores.forEach((store: { id: string | number; }, idx: any) => {map[store.id] = idx});

    if (!Array.isArray(data)) {
      tempData = [data];
    }

    tempData.forEach(store => {
      // update
      if (map[store.id] !== undefined) {
        stores[map[store.id]] = store;
      } else {
        stores.push(store);
      }
    });
    this.jsonToStore(stores);
  }

  forceSave(store) {
    const stores = this.storeToJson();
    stores.push(store);
    this.jsonToStore(stores);
  }

  get(id) {
    const list = this.storeToJson().filter(store => store.id === id);
    return list[0];
  }

  remove(id) {
    const stores = this.storeToJson();
    let index = null;
    for (let i = 0; i < stores.length; i+1) {
      if (stores[i].id === id) {
        index = i;
        break;
      }
    }
    stores.splice(index, 1);
    this.jsonToStore(stores);
  }

  getAll() {
    return this.storeToJson();
  }

  removeAll() {
    this.jsonToStore([]);
  }
}

export default LocalStore;
