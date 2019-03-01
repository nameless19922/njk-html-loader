const compiler = require('./compiler');

describe('filter', () => {
  test('should generate correct code', async () => {
    const stats = await compiler('fixtures/filter.njk', {
      env: {
        filters: {
          shorten(value, count) {
            return value.slice(count || 5);
          },
        },
      },
    });
    const output = stats.toJson().modules[0].source;

    expect(output).toMatchSnapshot();
  });
});
