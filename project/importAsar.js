const asar = require('asar');
const fs = require('fs');
const src = 'src';
const dest = './update/update.asar';
const pjson = require('./package.json');


var update = {};
update.asar = "http://localhost:4000/update.asar";
update.version = pjson.version;
update.name = "app",
fs.writeFileSync('./update/version.json',JSON.stringify(update));
fs.writeFileSync('./src/version.txt',pjson.version);
asar.createPackage(src, dest);