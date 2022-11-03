const { robot } = require('../src/robot');

const { readFromFile } = require('../src/utils/helper');

describe(`Validate Reading test cases from file`, () => {
  it('Should yield success read test case from file testCase3.txt', async () => {
    const data = await readFromFile();
    expect(data).toContain('PLACE 1,2,EAST');
  });

  it('Should yield failed to read file', async () => {
    const data = await readFromFile('testCase7.txt');
    expect(data).toBe('failed to read file');
  });
});

describe(`Validate Command Inputs`, () => {
  test('Should yield the excepted validation pass for testCase1.txt', async () => {
    expect(await robot.validate(['PLACE 0, 0,NORTH', 'MOVE', 'REPORT'], true)).toBe(true);
  });

  test('Should yield the excepted validation pass for testCase2.txt', async () => {
    expect(await robot.validate(['PLACE 0, 0,NORTH', 'LEFT', 'REPORT'], true)).toBe(true);
  });

  test('Should yield the excepted validation pass for testCase3.txt', async () => {
    expect(await robot.validate(['PLACE 1, 2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'REPORT'], true)).toBe(true);
  });

  test('Should fail to pass validation testCase3.txt unhappy path', async () => {
    expect(await robot.validate(['TesPLACE 1, 2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE', 'REPORT'], true)).toBe(true);
  });
});

describe(`Application simulation (Integration testing in simulation logic)`, () => {
  test('Should read the test1 case input from file name testCase1.txt validate the logic and yield successful test pass which is "0,1,NORTH"', async () => {
    expect(robot.init(await readFromFile('testCase1.txt'))).toBe('0,1,NORTH');
  });

  test('Should read the test2 case input from file name testCase2.txt validate the logic and yield successful test pass which is "0,0,WEST"', async () => {
    expect(robot.init(await readFromFile('testCase2.txt'))).toBe('0,0,WEST');
  });

  test('Should read the test3 case input from file name testCase3.txt validate the logic and yield successful test pass which is "3,3,NORTH"', async () => {
    expect(robot.init(await readFromFile('testCase3.txt'))).toBe('3,3,NORTH');
  });

  test('Should fail to read the test case input from file name testCase4.txt ', async () => {
    expect(robot.init(await readFromFile('testCase3m.txt'))).toBe('Invalid command');
  });
});
