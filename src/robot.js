const robot = (function () {
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

  function startGame(commands) {
    const TABLE_ROWS = 4;
    const TABLE_COLUMNS = 4;
    let rowAxis = null;
    let columnAxis = null;
    let face = null;

    for (const { command, type } of commands) {
      switch (type) {
        case 'PLACE':
          const xAxis = +command.charAt(8);
          const yAxis = +command.charAt(6);
          const direction = command.substring(10);
          if (xAxis < 0 || xAxis > 4 || yAxis < 0 || yAxis > 4) continue;
          rowAxis = xAxis;
          columnAxis = yAxis;
          face = direction;
          break;
        case 'MOVE':
          if (!rowAxis && !columnAxis && !face) continue;
          if (face === 'NORTH') {
            if (rowAxis + 1 > TABLE_ROWS) continue;
            rowAxis += 1;
          } else if (face === 'SOUTH') {
            if (rowAxis - 1 < 0) continue;
            rowAxis -= 1;
          } else if (face === 'EAST') {
            if (columnAxis + 1 > TABLE_COLUMNS) continue;
            columnAxis += 1;
          } else if (face === 'WEST') {
            if (columnAxis - 1 < 0) continue;
            columnAxis -= 1;
          }
          break;
        case 'LEFT':
          if (!rowAxis && !columnAxis && !face) continue;
          if (face === 'EAST') {
            face = 'NORTH';
          } else if (face === 'NORTH') {
            face = 'WEST';
          } else if (face === 'WEST') {
            face = 'SOUTH';
          } else if (face === 'SOUTH') {
            face = 'EAST';
          }
          break;
        case 'RIGHT':
          if (!rowAxis && !columnAxis && !face) continue;
          if (face === 'EAST') {
            face = 'SOUTH';
          } else if (face === 'NORTH') {
            face = 'EAST';
          } else if (face === 'WEST') {
            face = 'NORTH';
          } else if (face === 'SOUTH') {
            face = 'WEST';
          }
          break;
        case 'REPORT':
          if (columnAxis !== null && rowAxis !== null) {
            return `${columnAxis},${rowAxis},${face}`;
          } else {
            throw new Error('Invalid command');
          }
        default:
          throw new Error('Invalid command');
      }
    }
  }

  function init(inputCommands) {
    try {
      return startGame(validateCommands(inputCommands));
    } catch (error) {
      return 'Invalid command';
    }
  }

  return {
    init: init,
    validate: validateCommands,
  };
})();

module.exports = { robot };
