const fs = require('fs');

function createFolder(name, path) {
  if (!path) {
    console.log('Path must be the type string'.red);
  }

  try {
    const dir = fs.existsSync(`${path}/${name}/`);
    if (!dir) {
      fs.mkdirSync(`${path}/${name}/`, { recursive: true });
    } else {
      console.log(`There is already a folder named ${name}`.yellow);
      process.exit(5);
    }
  } catch (error) {
    console.log(`Can't create the folder ${name}`.red);
    process.exit(4);
  }
}

module.exports = { createFolder };
