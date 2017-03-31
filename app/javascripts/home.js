"use strict";

const PEST = require('./libs/PEST/PESTest-client');

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getInfo() {
  var userID = getParameterByName('userID');
  var password = getParameterByName('password');
  if( userID && password ) {
    return { userID: userID, password:password };
  }
}

async function newClient() {
  var info = getInfo();
  if( info ) {
    var client = new PEST.PESTClient(info);
    await client.login();
    await client.logout();
    return client;
  }
}
