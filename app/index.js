"use strict";

const PEST = require('./libs/PEST/PESTest-client');

async function login(info) {
  var client = new PEST.PESTClient(info);
  console.log(info);
  var res = await client.login();
  console.log(res);
  return res;
}
