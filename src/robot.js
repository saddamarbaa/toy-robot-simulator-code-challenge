const { readFromFile } = require('./utils/helper');

let commandLineArguments = [];

function restCommandLineArgument() {
  commandLineArguments = [];
}

function giveInstructions() {
  restCommandLineArgument();
  console.log('\nTo terminate this program, press CTRL+C (for Windows) or Command+C (for Mac) on your keyboard');
  console.log('Start typing your commands below or type "F" to run already made test cases from the file\n');
}

const robot = (function () {
  const TABLE_ROWS = 4;
  const TABLE_COLUMNS = 4;
  const CARDINAL_DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  let rowAxis = null;
  let columnAxis = null;
  let face = null;

  function logger(args) {
    console.log(args);
  }

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
          restCommandLineArgument();
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
          restCommandLineArgument();
          logger(/* A variable that is used to store error messages. */ errorMessage);
          throw new Error(errorMessage);
        } else if (isPlaceOutOfTable(remainder.charAt(2), remainder.charAt(0))) {
          errorMessage = 'Please enter a valid command: place is out table';
          restCommandLineArgument();
          logger(errorMessage);
          throw new Error(errorMessage);
        }
        return returnBoolean ? true : { command: command, type: 'PLACE' };
      });

    if (typeof commands === 'string') {
      restCommandLineArgument();
      logger('Please enter a valid file name (failed to read file)');
      throw new Error('Please enter a valid file name (failed to read file)');
    } else if (returnBoolean) return validationResult.every((item) => item === true);
    return validationResult;
  }

  function isPlaceOutOfTable(xAxis, yAxis) {
    return xAxis < 0 || xAxis > TABLE_ROWS || yAxis < 0 || yAxis > TABLE_COLUMNS;
  }

  function report() {
    if (columnAxis !== null && rowAxis !== null) {
      logger(`\nCurrent position of the toy robot is : ${columnAxis},${rowAxis},${CARDINAL_DIRECTIONS[face]}\n`);
      giveInstructions();
      return `${columnAxis},${rowAxis},${CARDINAL_DIRECTIONS[face]}`;
    } else {
      logger(`Invalid command`);
      giveInstructions();
      throw new Error('Invalid command');
    }
  }

  function place(command) {
    // Extract x,y Axis and the direction
    const xAxis = +command.charAt(8);
    const yAxis = +command.charAt(6);
    const direction = command.substring(10);
    const cardinalDirectionIdx = CARDINAL_DIRECTIONS.findIndex((cardinalDirection) => cardinalDirection === direction);

    // Saving robot place
    rowAxis = xAxis;
    columnAxis = yAxis;
    face = cardinalDirectionIdx;
  }

  function move() {
    if (isPlaceOutOfTable(rowAxis, columnAxis)) return false;

    // Calculate next step
    const direction = CARDINAL_DIRECTIONS[face];
    const nextRowAxis = direction === 'NORTH' ? rowAxis + 1 : direction === 'SOUTH' ? rowAxis - 1 : rowAxis;
    const nextColumnAxis = direction === 'EAST' ? columnAxis + 1 : direction === 'WEST' ? columnAxis - 1 : columnAxis;

    // Terminate function if the next step is out of the table
    if (isPlaceOutOfTable(nextRowAxis, nextColumnAxis)) return false;

    // Moving the robot
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
            giveInstructions();
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
    restCommandLineArguments();
    console.log('Invalid command ', error);
  }
};

const readInput = () => {
  let stdin = process.openStdin();
  stdin.addListener('data', function (input) {
    let command = input.toString().trim().toUpperCase();
    commandLineArguments.push(command);
    if (command === 'REPORT') {
      startGame(commandLineArguments);
    } else if (command === 'F') {
      restCommandLineArgument();
      startGame();
    }
  });
};

const init = () => {
  giveInstructions();
  readInput();
};

module.exports = { robot, init };
