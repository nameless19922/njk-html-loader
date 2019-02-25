const nunjucks = require('nunjucks');

const Njk = require('./njk');

/**
 * Loader class
 * @type {module.Loader}
 */
module.exports = class Loader {
  /**
   * Represents loader
   * @param {string} source
   * @param {string|Array} contextLoader
   * @param {string} root
   */
  constructor(source, contextLoader, root = '.') {
    this.source = source;
    this.contextLoader = contextLoader;

    if (root) {
      this.root = Array.isArray(root) ? root : [root];
    } else {
      this.root = '.';
    }

    this.env = new nunjucks.Environment(
      new Njk(
        this.root,
        path => this.contextLoader.addDependency(path),
      ),
    );

    this.compile();
  }

  /**
   * Compiles njk-file
   */
  compile() {
    this.compiled = nunjucks.compile(this.source, this.env);
  }

  /**
   * Renders file with data object
   * @param {Object} data
   * @returns {Promise<any>}
   */
  render(data) {
    return new Promise((resolve, reject) => {
      this.compiled.render(typeof data === 'object' ? data : {}, (err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      });
    });
  }
};
