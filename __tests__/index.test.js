// const { robot } = require('../src/index');

const { readFromFile } = require('../src/utils/helper');

describe(`Read test cases from file`, function () {
  it('Should yield success read test case from file testCase3.txt', async function () {
    const data = await readFromFile();
    expect(data).toContain('PLACE 1,2,EAST');
  });

  it('Should yield failed to read filet', async function () {
    const data = await readFromFile('testCase7.txt');
    expect(data).toBe('failed to read file');
  });
});
