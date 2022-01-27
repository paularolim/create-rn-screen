const fs = require('fs');

function writeImport(name, path, commonjs = true) {
  return commonjs ? `const ${name} = require('${path}');\n` : `import ${name} from '${path}';\n`;
}

function writeFunction(name, config) {
  let structure = '';
  structure += config.typescript && config.components === 'Arrow function (ES6)' ? `export const ${name} = (props: ${name}Props) => {\n` : '';
  structure += !config.typescript && config.components === 'Arrow function (ES6)' ? `export const ${name} = (props) => {\n` : '';
  structure += config.typescript && config.components === 'Classic function (ES5)' ? `export function ${name}(props: ${name}Props) {\n` : '';
  structure += !config.typescript && config.components === 'Classic function (ES5)' ? `export function ${name}(props) {\n` : '';
  structure += 'const [state, setState] = useState(\'\');';
  structure += 'return (';
  structure += config.style === 'StyleSheet' ? '<View style={styles.container}>' : '';
  structure += config.style === 'StyledComponents' ? '<Container>' : '';
  structure += `<Text>${name}</Text>`;
  structure += config.style === 'StyleSheet' ? '</View>' : '';
  structure += config.style === 'StyledComponents' ? '</Container>' : '';
  structure += `
    )
  } `;
  return structure;
}

function createIndex(name, path, config) {
  const filePath = `${path}/${name}`;
  const extension = config.typescript ? 'tsx' : 'jsx';
  const fileName = 'index';
  const completePath = `${filePath}/${fileName}.${extension}`;

  try {
    let structure;
    structure = `// ${completePath}\n`;
    structure += writeImport('React, { useState }', 'react', config.commonjs);
    structure += config.style === 'StyleSheet' ? writeImport('{ View, Text }', 'react-native', config.commonjs) : '';
    structure += config.style === 'StyledComponents' ? writeImport('{ Text }', 'react-native', config.commonjs) : '';
    structure += config.style === 'StyledComponents' ? writeImport('{ Container }', './styles', config.commonjs) : '';
    structure += config.style === 'StyleSheet' ? writeImport('{ styles }', './styles', config.commonjs) : '';
    structure += config.typescript ? writeImport(`{ ${name}Props }`, './types', config.commonjs) : '';
    structure += writeFunction(name, config);

    fs.writeFileSync(completePath, structure);
  } catch (error) {
    console.log(`Can't create the file ${completePath}`.red);
    console.log(error);
    process.exit(7);
  }
}

module.exports = { createIndex };
