var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var frames = new Map();
var hostCount = 0;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.get("/hostId", (req, res) => {
  console.log("get host id");
  const hostId = hostCount++;
  if (!frames.has(hostId)) {
    frames.set(hostId, []);
  }
  res.send({ hostId });
});
app.post("/sendMessage", (req, res) => {
  const aa = req.body;
  console.log("someone has visited my first node server !", aa);
  const { hostId, data } = aa;
  if (!frames.has(hostId)) {
    frames.set(hostId, []);
  }
  const frameBuffer = frames.get(hostId);
  frameBuffer.push(data);
  res.send("ok");
});
app.post("/getMessage", (req, res) => {
  const data = req.body;
  const { hostId, frameId } = data;
  if (!frames.has(hostId)) {
    frames.set(hostId, []);
  }
  const frameBuffer = frames.get(hostId);
  if (frameBuffer && frameBuffer.length > 0) {
    const data = frameBuffer.filter((item, index) => index > frameId);
    const fid = frameBuffer.length - 1;
    res.send({ fid, frames: data });
  } else {
    res.send({ message: "no frames", frames: [] });
  }
});
app.listen(8090, function () {
  console.log("server started at http://localhost:8090  ......");
});
