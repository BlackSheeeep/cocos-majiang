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
  getQueuePromise() {
    let curPromise = Promise.resolve();
    return (fn) => {
      curPromise = curPromise.then(() => {
        return new Promise((res) => {
          setTimeout(() => {
            fn();
            res();
          }, 1000 / 3);
        });
      });
    };
  }
  sort2D(player: cc.Node, mode: string = "horizontal", cb = () => {}) {
    const offset = 0.1;
    const objects = player.children;
    const queuePromise = this.getQueuePromise();
    objects.forEach((obj, index) => {
      obj.active = false;
      queuePromise(() => {
        obj.setPosition(new Vec3(0, 0, 0));
        const temp = new Vec3(0, 0, 0);
        if (mode === "horizontal") {
          temp.x += -obj.width / 2 + obj.width * index + offset * index;
        } else if (mode === "vertical") {
          temp.y -= obj.height / 2 + obj.height * index + offset * index;
        }
        obj.active = true;
        obj.setPosition(temp);
        if (index === objects.length - 1) {
          cb();
        }
      });
    });
  }

  sort3D(
    player: cc.Node,
    mode: string = "horizontal",
    dir: string = "left",
    cb = () => {}
  ) {
    const offset = 0.01;
    const objects = player.children;
    const width = 0.7;
    const queuePromise = this.getQueuePromise();
    objects.forEach((obj: cc.Node, index) => {
      obj.active = false;
      queuePromise(() => {
        obj.active = true;
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
        if (index === objects.length - 1) {
          cb();
        }
      });
    });
  }
  setLayer() {
    const position2 = this.player2.getPosition();
    position2.x = -position2.x;
    this.player4.setPosition(position2);
  }
  allSorted() {
    // 麻将排列动画完成
  }
  startSort() {
    if (!this.startPoint || !this.player1) return;
    this.setLayer();
    let foo = 0;
    this.sort2D(this.player1, "horizontal", () => {
      foo &= Math.pow(2, 0);
      if (foo === 15) {
        this.allSorted();
      }
    });
    this.sort3D(this.player3, "horizontal", "top", () => {
      foo &= Math.pow(2, 2);
      if (foo === 15) {
        this.allSorted();
      }
    });
    this.sort3D(this.player2, "vertical", "left", () => {
      foo &= Math.pow(2, 1);
      if (foo === 15) {
        this.allSorted();
      }
    });
    this.sort3D(this.player4, "vertical", "right", () => {
      foo &= Math.pow(2, 3);
      if (foo === 15) {
        this.allSorted();
      }
    });
  }

  // update (dt) {}
}
