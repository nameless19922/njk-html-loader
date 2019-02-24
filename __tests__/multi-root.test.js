const path = require('path');

const compiler = require('./compiler');

describe('multi-root', () => {
  test('should generate correct code', async () => {
    const stats = await compiler('fixtures/multi-root.njk', {
      root: path.resolve(__dirname, 'fixtures'),
    });
    const output = stats.toJson().modules[0].source;

    expect(output).toMatchSnapshot();
  });
});
