"use strict";

const lib = require('./libs/PEST/PESTest-client');

function login(e) {
    if (e.preventDefault) e.preventDefault();
    const form = e.srcElement.childNodes[1].childNodes[3];
    const info = { username: form.childNodes[1].childNodes[1].value,
                   password: form.childNodes[3].childNodes[1].value };
    console.log(username+'\n'+password);
    return false;
}
