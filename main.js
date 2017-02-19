const JSONMap = require("./jsonmap.js");
const MSCP = require("mscp");

(async () => {
  let map = new JSONMap()
  await map.init();

  let mscp = new MSCP(map)
  mscp.start();
})()
