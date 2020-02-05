import { observable, observe, toJS } from "mobx";

const storage = localStorage;

export default (name: string, data: any) => {
  const initData = data;
  const vname = `store.${name}`;
  const sData = storage.getItem(vname);
  let obs = observable(initData);
  if (sData) {
    let newData = JSON.parse(sData);
    for (let i in newData) {
      obs[i] = newData[i];
    }
  }

  observe(obs, () => {
    storage.setItem(vname, JSON.stringify(obs));
  });

  return obs;
};
