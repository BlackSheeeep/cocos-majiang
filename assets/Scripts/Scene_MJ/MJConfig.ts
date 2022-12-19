export enum MJType {
  TIAO = 1,
  TONG,
  WAN,
  DONG,
  NAN,
  XI,
  BEI,
  ZHONG,
  FA,
  BAI,
}
const head = "MJ_";
const map = {
  [MJType.TIAO]: (n: number) => head + n.toString() + "_TIAO",
  [MJType.TONG]: (n: number) => head + n.toString() + "_TONG",
  [MJType.WAN]: (n: number) => head + n.toString() + "_WAN",
  [MJType.DONG]: () => head + "DONG",
  [MJType.NAN]: () => head + "NAN",
  [MJType.XI]: () => head + "XI",
  [MJType.BEI]: () => head + "BEI",
  [MJType.ZHONG]: () => head + "ZHONG",
  [MJType.FA]: () => head + "FA",
  [MJType.BAI]: () => head + "BAI",
};
export default {
  getSpriteFrameName(type: MJType, num?: number) {
    if (!map[type]) return "";
    return map[type](num);
  },
  spritePlistPath: "MJUI/Scene_MAJIANG/majiang",
};
