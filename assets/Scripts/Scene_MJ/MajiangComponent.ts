// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import NetComponent from "../Common/UpdateNet/NetComponent";
import { MJType, default as MJConfig } from "./MJConfig";
const { ccclass, property } = cc._decorator;
const { Vec3, resources, Sprite, SpriteAtlas } = cc;
@ccclass
export default class NewClass extends NetComponent {
  init(type: MJType, num?: number) {
    const name = MJConfig.getSpriteFrameName(type, num);
    //@ts-ignore
    resources.load<SpriteAtlas>(
      MJConfig.spritePlistPath,
      SpriteAtlas,
      (err: any, atlas) => {
        if (atlas) {
          this.node.getComponent(Sprite).spriteFrame =
            atlas.getSpriteFrame(name);
        }
      }
    );
  }
  start() {}
  update() {}
  updateNet(dt: number, msg: any): void {}
  // update (dt) {}
}
