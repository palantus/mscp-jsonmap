"use strict"

const crypto = require('crypto')
const fs = require('fs')
const path = require("path")
const dataDir = './data'
const secret = '43hu658324hyt82ghyHFGERuy38f';

class JSONMap{
  async initFirst(){
    await new Promise(r => fs.mkdir(dataDir, (err) => r()));
  }

  async get(key, defaultValue){
    var filename = this.getFilenameFromKey(key)
    return await new Promise(r => fs.readFile(filename, "utf-8", (err, file) => {
      if(err) return r(defaultValue)
      r(JSON.parse(file))
    }))
  }

  async set(key, value){
    var filename = this.getFilenameFromKey(key)
    let val = value;
    if(typeof value === "string"){
      try{
        val = JSON.parse(value)
      } catch(err){}
    }
    await new Promise(r => fs.writeFile(filename, JSON.stringify(val), "utf8", (err) => r()))
    return this.get(key)
  }

  async delete(key){
    let filename = this.getFilenameFromKey(key)
    await new Promise(r => fs.unlink(filename, (err) => r()))
    return {}
  }

  getFilenameFromKey(key){
    let hash = crypto.createHmac('sha256', secret).update(key).digest('hex');
    return path.join(dataDir, hash);
  }
}

module.exports = JSONMap
