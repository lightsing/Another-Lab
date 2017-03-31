"use strict";

const PEST = require('./libs/PEST/PESTest-client');

async function login(info) {
  var client = new PEST.PESTClient(info);
  var res = await client.login();
  await client.logout(); // login is only use for validate the password.
  return client;
}
