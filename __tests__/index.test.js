const compiler = require('./compiler');

describe('index', () => {
  test('should generate correct code', async () => {
    const stats = await compiler('fixtures/index.njk', { });
    const output = stats.toJson().modules[0].source;

    expect(output).toMatchSnapshot();
  });
});
