const { readFromFile } = require('./utils/helper');

const robot = (function () {
  const TABLE_ROWS = 4;
  const TABLE_COLUMNS = 4;
  const CARDINAL_DIRECTIONS = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
  let rowAxis = null;
  let columnAxis = null;
  let face = null;

  function validateCommands(commands, returnBoolean) {
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
          throw new Error('Invalid command');
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

          throw new Error('Invalid command');
        }

        return returnBoolean ? true : { command: command, type: 'PLACE' };
      });

    if (typeof commands === 'string') throw new Error();
    else if (returnBoolean) return validationResult.every((item) => item === true);
    return validationResult;
  }

  function isRobotPlaceIsOutOfTable(xAxis, yAxis) {
    return xAxis < 0 || xAxis > TABLE_ROWS || yAxis < 0 || yAxis > TABLE_COLUMNS;
  }

  function report() {
    if (columnAxis !== null && rowAxis !== null) {
      console.log(`${columnAxis},${rowAxis},${CARDINAL_DIRECTIONS[face]}`);
      return `${columnAxis},${rowAxis},${CARDINAL_DIRECTIONS[face]}`;
    } else {
      console.log(`Invalid command`);
      throw new Error('Invalid command');
    }
  }

  function place(command) {
    // Extract x,y Axis and the direction
    const xAxis = +command.charAt(8);
    const yAxis = +command.charAt(6);
    const direction = command.substring(10);
    const cardinalDirectionIdx = CARDINAL_DIRECTIONS.findIndex((cardinalDirection) => cardinalDirection === direction);

    // Terminate function if place is out of table
    if (isRobotPlaceIsOutOfTable(xAxis, yAxis)) return;

    // Saving robot place
    rowAxis = xAxis;
    columnAxis = yAxis;
    face = cardinalDirectionIdx;
  }

  function move() {
    if (isRobotPlaceIsOutOfTable(rowAxis, columnAxis)) return;

    // Calculate next step
    const direction = CARDINAL_DIRECTIONS[face];
    const nextRowAxis = direction === 'NORTH' ? rowAxis + 1 : direction === 'SOUTH' ? rowAxis - 1 : rowAxis;
    const nextColumnAxis = direction === 'EAST' ? columnAxis + 1 : direction === 'WEST' ? columnAxis - 1 : columnAxis;

    // Terminate function if the next step is out of the table
    if (isRobotPlaceIsOutOfTable(nextRowAxis, nextColumnAxis)) return;

    // Moving the robot
    rowAxis = nextRowAxis;
    columnAxis = nextColumnAxis;
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
          move();
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
      return 'Invalid command';
    }
  }

  return {
    init: init,
    validate: validateCommands,
  };
})();

(async () => {
  try {
    robot.init(await readFromFile('testCase1.txt'));
    robot.init(await readFromFile('testCase2.txt'));
    robot.init(await readFromFile('testCase3.txt'));
  } catch (error) {
    console.log('Invalid command ', error);
  }
})();

module.exports = { robot };
