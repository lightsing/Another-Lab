"use strict";

const PEST = require('pest-client');

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

const undo = `<li class="mdl-list__item mdl-list__item--three-line">
  <span class="mdl-list__item-primary-content">
    <span>{0}</span>
    <span class="mdl-list__item-text-body">
      {1}
    </span>
  </span>
  <span class="mdl-list__item-secondary-content undo-list">
    <a class="mdl-list__item-secondary-action" href="#">
      <i class="material-icons">send</i>
    </a>
    <span style="display:none">{2}</span>
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

function refreshGrades(client) {
  var info = $('#info');
  info.empty();
  client.getGrades().then((res) => {
    if (res.length>0){
      info.css("display", "block");
      for (var i = res.length; i-- > 0;){
        info.append(String.format(cell,res[i].ExamName,res[i].ClassName,res[i].GainPoint));
      }
    }
  });
}

function refreshUndo(client) {
  var info = $('#undo');
  info.empty();
  client.getUnfinishedExamInfo().then((res) => {
    if (res.length>0){
      info.css("display", "block");
      for (var i = res.length; i-- > 0;){
        info.prepend(String.format(undo,res[i].ExamName,res[i].Place,res[i].ExamID));
      }
    }
    $('.undo-list').click(function() {
      var examID = $("span",this).text();
      client.getExamInfo(examID, client.user.userID).then((res) => {
        res.UsePapers = res.PaperID;
        client.finishExam(res).then((res) => {
          console.log(res);
          refreshUndo(client);
          refreshGrades(client);
        });
      });
    });
  });
}
