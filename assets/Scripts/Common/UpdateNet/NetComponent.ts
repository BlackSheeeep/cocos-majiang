// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass } = cc._decorator;
let events = [];
globalThis.public_asyncAddListener = function (name, fallback) {
  events.push({ name, fallback });
};
globalThis.public_emitEvent = function (event, ...params) {
  events = events.filter((item) => {
    const isThis = event === item.name;
    if (isThis) {
      item.fallback(...params);
    }
    return !isThis;
  });
};

@ccclass
export default class NetComponent extends cc.Component {
  instanceId = (Math.random() * 1000).toString() + Date.now().toString();
  remove = () => {};
  start() {
    globalThis.public_asyncAddListener(
      "UpdateNet",
      () => (this.remove = globalThis.UpdateNet.addListener(this))
    );
  }
  protected onDestroy(): void {
    this.remove();
  }
  sendMessage(msg) {
    if (!globalThis.UpdateNet) {
      console.error("UpdateNet 没有挂载到某个节点上");
      return;
    }
    msg.__id = this.instanceId;
    globalThis.UpdateNet && globalThis.UpdateNet.sendMessage(msg);
  }
  _updateNet(dt: number, msg) {
    this.updateNet(dt, msg);
  }
  // override this function
  updateNet(dt: number, msg: any) {}
}
