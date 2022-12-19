// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import { fetchData, getData } from "./Services";
enum Status {
  Loading,
  Waiting,
}
type Frame = {
  fid: number; // 帧的id 一般为自增的整数
  data: any; // 具体数据 待定
};
@ccclass
export default class UpdateNet extends cc.Component {
  frames: Frame[] = []; // 从服务端下发的帧列表 每个逻辑帧取出第一帧的数据
  listeners = []; // 监听列表 元素是对应的gameobject实例
  messageBuffer = []; // 发送请求的buffer
  frameId = -1; // 帧id
  @property
  fps: number = 60; // 锁逻辑帧
  // LIFE-CYCLE CALLBACKS:
  currTime = 0;
  _hostId: number = NaN; // 主机id 服务端根据这个划分房间
  _status: Status = Status.Waiting; // 状态
  // onLoad () {}
  start() {
    if (globalThis.UpdateNet) {
      console.error("不要挂载多个UpdateNet");
      return;
    }
    globalThis.UpdateNet = this;
    globalThis.public_emitEvent("UpdateNet");
    this.getHostId().then((res: any) => {
      const { hostId } = res.data;
      console.log("get", hostId);
      this._hostId = hostId;
    });
  }
  protected onDestroy(): void {
    globalThis.UpdateNet = null;
  }
  sendMessage(msg) {
    this.messageBuffer.push(msg);
  }
  async getHostId() {
    return getData("http://localhost:8090/hostId");
  }
  addListener(instance) {
    if (!this.listeners.find((item) => item === instance)) {
      this.listeners.push(instance);
    }
    return () => {
      const index = this.listeners.findIndex(instance);
      this.listeners[index] = null;
    };
  }
  async batchSend() {
    if (this.messageBuffer.length > 0) {
      const composite = this.messageBuffer.reduce((pre, item) => {
        const { instanceId } = item;
        pre[instanceId] = item;
        return pre;
      }, {});
      return fetchData("http://localhost:8090/sendMessage", composite);
    }
    return;
  }
  async getFrame() {
    const result = await fetchData("http://localhost:8090/getMessage", {
      frameId: this.frameId,
      hostId: this._hostId,
    });
    this._status = Status.Waiting;
    return result;
  }
  update(dt: number) {
    this.currTime += dt;
    if (this.currTime >= 1 / this.fps) {
      this.currTime = 0;
      if (this._status === Status.Waiting) {
        this._status = Status.Loading;
        this.batchSend()
          .then(() => this.getFrame())
          .then((res) => {
            const { frames } = res;
            const filterFrames =
              frames.filter((f) => f.fid > this.frameId) || [];
            if (filterFrames[0]?.fid || filterFrames[0]?.fid === 0) {
              this.frameId = filterFrames[0]?.fid;
            }
            this.frames.push(...filterFrames);
          });
      }
      if (this.frames.length > 0) {
        const { data } = this.frames.pop();
        this.listeners.forEach((item) => item && item._updateNet(dt, data));
      }
    }
  }
}
