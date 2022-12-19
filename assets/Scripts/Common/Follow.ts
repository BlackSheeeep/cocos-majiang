// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
const { Vec3 } = cc;
@ccclass
export default class NewClass extends cc.Component {
  @property
  far: number = 10;

  @property(cc.Node)
  target: cc.Node = null;

  @property
  angle: number = 45;

  // LIFE-CYCLE CALLBACKS:
  nv: cc.Vec3 = null;

  start() {
    // if (!this.target) {
    //   this.target = cc.find("Background");
    // }
    let a = this.angle / 180;
    if (a > 1) {
      a = 1;
    } else if (a < 0) {
      a = Math.abs(a);
    }
    this.nv = new Vec3(
      0,
      Math.sin((this.angle / 180) * Math.PI),
      Math.cos((this.angle / 180) * Math.PI)
    );
    this.node.setPosition(this.target.position.add(this.nv.mul(this.far)));
    this.node.lookAt(this.target.position);
    console.log("get", this.node.position);
  }

  // update (dt) {}
}
