// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import axios from "axios/dist/axios.min.js";
export async function fetchData(url, params) {
  const result = await axios.post(url, params);
  return result;
}
export async function getData(url) {
  const result = await axios.get(url);
  return result;
}
