const loaderUtils = require('loader-utils');

const Loader = require('./lib/loader');

/**
 * Loads and compiles njk-file
 * @param {string} source
 * @returns {Promise<void>}
 */
module.exports = async function (source) {
  const options = loaderUtils.getOptions(this);
  const callback = this.async();

  try {
    const loader = new Loader(source, this, options);

    callback(null, await loader.render(options.data));
  } catch (exc) {
    callback(exc);
  }
};
