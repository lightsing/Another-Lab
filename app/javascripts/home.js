"use strict";

const PEST = require('./libs/PEST/PESTest-client');

const cell = `<li class="mdl-list__item mdl-list__item--three-line">
  <span class="mdl-list__item-primary-content">
    <span>{0}</span>
    <span class="mdl-list__item-text-body">
      {1}
    </span>
  </span>
  <span class="mdl-list__item-secondary-content">
    <i class="material-icons">done</i>
    <span class="mdl-list__item-text-body">
      {2}/100
    </span>
  </span>
</li>`;

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

function generateCell(info) {
  return String.format(cell,res[i].ExamName,res[i].ClassName,res[i].GainPoint);
}
