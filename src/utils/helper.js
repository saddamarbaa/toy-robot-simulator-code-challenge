const fsPromises = require('fs/promises');

async function readFromFile(fileName = 'testCase3.txt') {
  try {
    const content = await fsPromises.readFile(`./testData/${fileName}`, { encoding: 'utf8' });
    const splitText = content.split('\n').map((item) => item.replace(/(\r\n|\n|\r)/gm, ''));
    const vaildText = splitText.filter((text) => text !== '');
    return vaildText;
  } catch (error) {
    return 'failed to read file';
  }
}

module.exports = { readFromFile };
