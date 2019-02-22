const path = require('path');

const compiler = require('./compiler');

describe('data', () => {
  test('should generate correct code', async () => {
    const stats = await compiler('fixtures/include.njk', {
      root: path.resolve(__dirname, 'fixtures'),
    });
    const output = stats.toJson().modules[0].source;

    expect(output).toMatchSnapshot();
  });
});
