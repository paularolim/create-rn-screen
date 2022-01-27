const fs = require('fs');

function writeImport(name, path, commonjs = true) {
  return commonjs ? `const ${name} = require('${path}');\n` : `import ${name} from '${path}';\n`;
}

function writeStyle(config) {
  let structure = '';

  structure += config.style === 'StyledComponents' ? writeImport('styled', 'styled-components/native', config.commonjs) : '';
  structure += config.style === 'StyleSheet' ? writeImport('{ StyleSheet }', 'react-native', config.commonjs) : '';

  structure += config.style === 'StyledComponents'
    ? `export const Container = styled.View\`
      flex: 1;
      justify-content: center;
      align-items: center;
    \`
    `
    : `export const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
    })
  `;

  return structure;
}

function createStyle(name, path, config) {
  const filePath = `${path}/${name}`;
  const extension = config.typescript ? 'ts' : 'js';
  const fileName = 'styles';
  const completePath = `${filePath}/${fileName}.${extension}`;

  try {
    let structure = `// ${completePath}\n`;
    structure += writeStyle(config);

    fs.writeFileSync(completePath, structure);
  } catch (error) {
    console.log(`Can't create the file ${completePath}`);
    console.log(error);
    process.exit(6);
  }
}

module.exports = { createStyle };
