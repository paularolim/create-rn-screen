const inquirer = require('inquirer');
const fs = require('fs');

function init() {
  inquirer.prompt([{
    name: 'modules',
    type: 'list',
    message: 'What type of modules does your project use?',
    choices: [
      'JavaScript modules (import/export)',
      'CommonJS (require/exports)',
    ],
  }, {
    name: 'style',
    type: 'list',
    message: 'What type of style does your project use?',
    choices: [
      'StyledComponents',
      'StyleSheet',
    ],
  }, {
    name: 'components',
    type: 'list',
    message: 'What type of components does your project use?',
    choices: [
      // 'Class component',
      'Classic function (ES5)',
      'Arrow function (ES6)',
    ],
  }, {
    name: 'typescript',
    type: 'list',
    message: 'Your project is using typescript?',
    choices: [
      'Yes',
      'No',
    ],
  },
  {
    name: 'screensPath',
    type: 'input',
    message: 'Screen folder path',
    default: 'src/screens',
  },
  {
    name: 'componentsPath',
    type: 'input',
    message: 'Component folder path',
    default: 'src/components',
  }]).then((answers) => {
    const config = {};
    config.commonjs = answers.modules === 'CommonJS (require/exports)';
    config.style = answers.style;
    config.components = answers.components;
    config.typescript = answers.typescript === 'Yes';
    config.screensPath = answers.screensPath;
    config.componentsPath = answers.componentsPath;
    fs.writeFileSync('rnscreen.json', JSON.stringify(config, null, 2));
  }).catch((error) => {
    console.log('Something went wrong'.red);
    console.log(error);
    process.exit(2);
  });
}

module.exports = { init };
