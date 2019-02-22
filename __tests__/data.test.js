const { readFileSync } = require('fs');
const path = require('path');

const compiler = require('./compiler');

describe('data', () => {
  test('should generate correct code with data object', async () => {
    const stats = await compiler('fixtures/data.njk', { data: { some: 'value' } });
    const output = stats.toJson().modules[0].source;

    expect(output).toMatchSnapshot();
  });

  test('should generate correct code with data.json', async () => {
    const stats = await compiler('fixtures/data-json.njk', {
      data: JSON.parse(readFileSync(path.resolve(__dirname, './data.json'), 'utf-8'))
    });
    const output = stats.toJson().modules[0].source;

    expect(output).toMatchSnapshot();
  });
});
