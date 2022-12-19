// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import NetComponent from "../Common/UpdateNet/NetComponent";
import { MJType } from "./MJConfig";
import AutoSort from "./AutoSort";
import MaJiangComponent from "./MajiangComponent";
const { ccclass, property } = cc._decorator;
const { Vec3 } = cc;
const mockData = [
  {
    type: MJType.BAI,
  },
  {
    type: MJType.ZHONG,
  },
  {
    type: MJType.FA,
  },
  {
    type: MJType.WAN,
    num: 1,
  },
  {
    type: MJType.WAN,
    num: 9,
  },
  {
    type: MJType.TONG,
    num: 9,
  },
  {
    type: MJType.TONG,
    num: 8,
  },
  {
    type: MJType.TONG,
    num: 9,
  },
  {
    type: MJType.TIAO,
    num: 9,
  },
  {
    type: MJType.TIAO,
    num: 1,
  },
];
@ccclass
export default class GameManager extends NetComponent {
  @property(cc.Node)
  loading = null;
  @property(cc.Prefab)
  prefab = null;
  mjs: any[];
  autoSort = null;
  @property(cc.Node)
  messageBoard = null;
  start() {
    if (!this.autoSort) {
      this.autoSort = this.getComponent(AutoSort);
    }
    this.init();
    globalThis.showMessage = this.showMessage.bind(this);
  }
  showMessage(msg: string) {
    if (!this.messageBoard) return;
    this.messageBoard.children.forEach((child) => {
      const label = child.getComponent(cc.Label);
      label.string = msg;
      this.messageBoard.active = true;
      setTimeout(() => {
        this.messageBoard.active = false;
      }, 1000);
    });
  }
  init() {
    if (this.loading) {
      this.loading.active = true;
      this.mjs = mockData;
      setTimeout(() => {
        this.loading.active = false;
        const player = cc.find("MainCanvas/player1");
        this.mjs.forEach((mj) => {
          const node = cc.instantiate(this.prefab);
          const mjc = node.getComponent(MaJiangComponent);
          mjc.init(mj.type, mj.num);
          player.addChild(node);
          this.autoSort.startSort();
        });
      }, 3000);
    }
  }
  update() {}
  updateNet(dt: number, msg: any): void {}
  // update (dt) {}
}
