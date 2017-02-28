const JSONMap = require("./jsonmap.js");
const MSCP = require("mscp");

(async () => {
  let mscp = new MSCP(JSONMap)
  mscp.start();
})()
