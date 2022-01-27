require('colors');
const { createFolder } = require('./src/createFolder');
const { createIndex } = require('./src/createIndex');
const { createStyle } = require('./src/createStyle');
const { createType } = require('./src/createTypes');
const { init } = require('./src/init');
const { readFile } = require('./src/readFile');

const firstParam = process.argv[2];
const secondParam = process.argv[3];

if (firstParam === '--init') {
  init();
} else if (firstParam && secondParam) {
  const config = JSON.parse(readFile('rnscreen.json'));

  const screenPath = secondParam === '--screen' ? config.screensPath : null;
  const componentPath = secondParam === '--component' ? config.componentsPath : null;
  const path = screenPath || componentPath;

  createFolder(firstParam, path);
  createIndex(firstParam, path, config);
  createStyle(firstParam, path, config);
  createType(firstParam, path, config);

  console.log('The process was successfully completed'.green);
}
