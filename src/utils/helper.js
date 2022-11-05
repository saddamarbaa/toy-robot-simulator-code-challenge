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

function giveInstruction(showHint = false) {
  logger('\nTo terminate this program, press CTRL+C (for Windows) or Command+C (for Mac) on your keyboard');

  logger(
    `To play start typing your commands ${
      showHint ? 'as example' : ''
    } below or type "F" to run already made test cases from the file`
  );

  if (showHint) {
    logger('PLACE 1,2,EAST\nMOVE\nMOVE\nLEFT\nMOVE\nREPORT\n');
  }
}

function logger(args) {
  console.log(args);
}

module.exports = { readFromFile, logger, giveInstruction };
