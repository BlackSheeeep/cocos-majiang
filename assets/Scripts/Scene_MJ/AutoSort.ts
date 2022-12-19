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
  startPoint: cc.Vec3 = new Vec3(0, 0, 0);
  @property(cc.Node)
  player1: cc.Node = null;
  @property(cc.Node)
  player2: cc.Node = null;
  @property(cc.Node)
  player3: cc.Node = null;
  @property(cc.Node)
  player4: cc.Node = null;
  @property(cc.Node)
  background = null;

  sort2D(player: cc.Node, mode: string = "horizontal") {
    const offset = 0.1;
    const objects = player.children;
    objects.forEach((obj, index) => {
      obj.setPosition(new Vec3(0, 0, 0));
      const temp = new Vec3(0, 0, 0);
      if (mode === "horizontal") {
        temp.x += -obj.width / 2 + obj.width * index + offset * index;
      } else if (mode === "vertical") {
        temp.y -= obj.height / 2 + obj.height * index + offset * index;
      }
      obj.setPosition(temp);
    });
  }
  sort3D(player: cc.Node, mode: string = "horizontal", dir: string = "left") {
    const offset = 0.01;
    const objects = player.children;
    const width = 0.7;
    objects.forEach((obj: cc.Node, index) => {
      obj.setPosition(new Vec3(0, 0, 0));
      const temp = new Vec3(0, 0, 0);
      if (mode === "horizontal") {
        temp.x += -width / 2 + width * index + offset * index;
      } else if (mode === "vertical") {
        temp.z += width / 2 + width * index + offset * index;
      }
      if (dir === "left") {
        obj.eulerAngles = new Vec3(-90, 90, 0);
      } else if (dir === "right") {
        obj.eulerAngles = new Vec3(-90, -90, 0);
      } else if (dir === "top") {
        obj.eulerAngles = new Vec3(-90, 0, 0);
      }
      obj.setPosition(temp);
    });
  }
  setLayer() {
    const position2 = this.player2.getPosition();
    position2.x = -position2.x;
    this.player4.setPosition(position2);
  }
  startSort() {
    if (!this.startPoint || !this.player1) return;
    this.setLayer();
    this.sort2D(this.player1);
    this.sort3D(this.player3, "horizontal", "top");
    this.sort3D(this.player2, "vertical", "left");
    this.sort3D(this.player4, "vertical", "right");
  }

  // update (dt) {}
}
