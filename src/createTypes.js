const fs = require('fs');

function createType(name, path, config) {
  if (!config.typescript) {
    return;
  }

  const filePath = `${path}/${name}`;
  const completePath = `${filePath}/types.ts`;

  try {
    let structure = `// ${completePath}\n`;
    structure += `
    export interface ${name}Props {
      active: boolean;
    }
    `;

    fs.writeFileSync(completePath, structure);
  } catch (error) {
    console.log(`Can't create the file ${completePath}`.red);
    console.log(error);
  }
}

module.exports = { createType };
