const { robot } = require('../src/robot');

const { readFromFile } = require('../src/utils/helper');

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
