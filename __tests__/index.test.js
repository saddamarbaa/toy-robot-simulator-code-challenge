const { robot } = require('../src/index');

test('Should yield the excepted validation pass', () => {
  expect(robot.validate(['PLACE       3,       1,NORTH', 'MOVE', 'MOVE', 'RIGHT', 'MOVE'])).toBe(true);
});

test('Should fail to pass validation', () => {
  expect(robot.validate(['PLACE       t3,       1,NORTH', 'MOVE', 'MOVE', 'RIGHT', 'MOVE'])).toBe(true);
});
