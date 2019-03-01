const path = require('path');
const webpack = require('webpack');
const memoryfs = require('memory-fs');

/**
 * Runs test build
 * @param {string} fixture
 * @param {object} options
 * @returns {Promise<any>}
 */
module.exports = (fixture, options = {}) => {
  const compiler = webpack({
    mode: 'none',

    context: __dirname,

    entry: `./${fixture}`,

    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },

    module: {
      rules: [{
        test: /\.njk$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: path.resolve(process.cwd(), 'index.js'),
            options,
          },
        ],
      }],
    },
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      const problem = err || stats.compilation.errors[0] || stats.compilation.warnings[0];

      if (problem) {
        const message = typeof problem === 'string' ? problem : 'Unexpected error';
        const error = new Error(problem.message || message);

        error.originalError = problem;
        error.stats = stats;

        return reject(error);
      }

      resolve(stats);
    });
  });
};
