const fs = require('fs');

function readFile(file) {
  try {
    return fs.readFileSync(file);
  } catch (error) {
    console.log(`Can't read the file ${file}`.red);
    console.log('Try running the \'npx create-rn-screen --init\' command first');
    process.exit(1);
  }

  return 1;
}

module.exports = { readFile };
