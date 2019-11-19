/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');

const allFiles = {};
fs.readdirSync(__dirname).forEach(file => {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    const fileName = file.replace('.js', '');
    allFiles[fileName] = require(`./${fileName}`).default;
  }
});

module.exports = allFiles;
