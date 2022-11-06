const { readFromFile, logger, giveInstruction } = require('./utils/helper');

const robot = (function () {
  const TABLE_ROWS = 4;
  const TABLE_COLUMNS = 4;
  const CARDINAL_DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  let rowAxis = null;
  let columnAxis = null;
  let face = null;

  function validateCommands(commands, returnBoolean) {
    let errorMessage =
      'Invalid command, the command should  start with  "PLACE <x-coordinate>,<y-coordinate>,<direction>"';
    const validationResult =
      typeof commands !== 'string' &&
      commands.map((command) => {
        command = command.trim();
        if (command === 'MOVE' || command === 'LEFT' || command === 'RIGHT' || command === 'REPORT') {
          return returnBoolean ? true : { command: command, type: command };
        }
        const firstWord = command.split(' ')[0];
        if (firstWord !== 'PLACE') {
          if (returnBoolean) {
            return false;
          }
          restCommandLine();
          logger(errorMessage);
          throw new Error(errorMessage);
        }

        const indexOfSpace = command.indexOf(' ');
        const remainder = command.substring(indexOfSpace + 1).replace(/\s/g, '');
        const lastWord = remainder.substring(4);

        if (
          isNaN(remainder.charAt(0)) ||
          isNaN(remainder.charAt(2)) ||
          remainder.charAt(1) !== ',' ||
          remainder.charAt(3) !== ',' ||
          (lastWord !== 'EAST' && lastWord !== 'WEST' && lastWord !== 'SOUTH' && lastWord !== 'NORTH')
        ) {
          if (returnBoolean) {
            return false;
          }
          restCommandLine();
          logger(errorMessage);
          throw new Error(errorMessage);
        } else if (isPlaceOutOfTable(remainder.charAt(2), remainder.charAt(0))) {
          errorMessage = 'Please enter a valid command: place is out table';
          restCommandLine();
          logger(errorMessage);
          throw new Error(errorMessage);
        }
        return returnBoolean ? true : { command: command, type: 'PLACE' };
      });

    if (typeof commands === 'string') {
      errorMessage = 'Please enter a valid file name (failed to read file)';
      restCommandLine();
      logger(errorMessage);
      throw new Error(errorMessage);
    } else if (returnBoolean) return validationResult.every((item) => item === true);
    return validationResult;
  }

  function isPlaceOutOfTable(xAxis, yAxis) {
    return xAxis < 0 || xAxis > TABLE_ROWS || yAxis < 0 || yAxis > TABLE_COLUMNS;
  }

  function report() {
    if (columnAxis !== null && rowAxis !== null && CARDINAL_DIRECTIONS[face]) {
      logger(`\nCurrent position of the toy robot is : ${columnAxis},${rowAxis},${CARDINAL_DIRECTIONS[face]}\n`);
      restCommandLine();
      giveInstruction();
      return `${columnAxis},${rowAxis},${CARDINAL_DIRECTIONS[face]}`;
    } else {
      logger(`Invalid command`);
      restCommandLine();
      giveInstruction();
      throw new Error('Invalid command');
    }
  }

  function place(command) {
    const xAxis = +command.charAt(8);
    const yAxis = +command.charAt(6);
    const direction = command.substring(10);
    const cardinalDirectionIdx = CARDINAL_DIRECTIONS.findIndex((cardinalDirection) => cardinalDirection === direction);

    rowAxis = xAxis;
    columnAxis = yAxis;
    face = cardinalDirectionIdx;
  }

  function move() {
    if (isPlaceOutOfTable(rowAxis, columnAxis)) return false;

    const direction = CARDINAL_DIRECTIONS[face];
    const nextRowAxis = direction === 'NORTH' ? rowAxis + 1 : direction === 'SOUTH' ? rowAxis - 1 : rowAxis;
    const nextColumnAxis = direction === 'EAST' ? columnAxis + 1 : direction === 'WEST' ? columnAxis - 1 : columnAxis;

    if (isPlaceOutOfTable(nextRowAxis, nextColumnAxis)) return false;

    rowAxis = nextRowAxis;
    columnAxis = nextColumnAxis;

    return true;
  }

  function rotate(direction) {
    face = (face + 1 * (direction === 'RIGHT' ? 1 : -1) + CARDINAL_DIRECTIONS.length) % CARDINAL_DIRECTIONS.length;
  }

  function play(commands) {
    for (const { command, type: commandType } of commands) {
      switch (commandType) {
        case 'PLACE':
          place(command);
          break;
        case 'MOVE':
          const canContinue = move();
          if (!canContinue) {
            const errorMessage = 'Invalid command: cant move';
            logger(errorMessage);
            restCommandLine();
            giveInstruction();
            throw new Error(errorMessage);
          }
          break;
        case 'LEFT':
        case 'RIGHT':
          rotate(commandType);
          break;
        case 'REPORT':
          return report();
          break;
      }
    }
  }

  function init(inputCommands) {
    try {
      return play(validateCommands(inputCommands));
    } catch (error) {
      return error.message || 'Invalid command';
    }
  }

  return {
    init: init,
    validate: validateCommands,
  };
})();

let commandLineArguments = [];
function restCommandLine() {
  commandLineArguments = [];
}

const startGame = async (commands) => {
  try {
    if (commands) {
      robot.init(commands);
    } else {
      robot.init(await readFromFile('testCase1.txt'));
      robot.init(await readFromFile('testCase2.txt'));
      robot.init(await readFromFile('testCase3.txt'));
      robot.init(await readFromFile('testCase48.txt'));
    }
  } catch (error) {
    restCommandLine();
    logger(`Invalid command  ${error}`);
  }
};

const readFromCommandLine = () => {
  let stdin = process.openStdin();
  stdin.addListener('data', function (input) {
    let command = input.toString().trim().split(' ').join('').toUpperCase();
    if (command.includes('PLACE')) command = `PLACE ${command.substring(5)}`;
    commandLineArguments.push(command);
    if (command === 'REPORT') {
      startGame(commandLineArguments);
    } else if (command === 'F') {
      restCommandLine();
      startGame();
    }
  });
};

const init = () => {
  restCommandLine();
  giveInstruction(true);
  readFromCommandLine();
};

module.exports = { robot, init };
