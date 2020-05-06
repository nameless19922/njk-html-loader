const nunjucks = require('nunjucks');
const path = require('path');
const { readdirSync } = require('fs');

const { hasOwn, isNotNullObject } = require('./utils');
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
   * @param {Object} options
   */
  constructor(source, contextLoader, options) {
    const defaultOptions = {
      data: null,
      root: '.',
      env: {},
      configuration: {},
    };

    this.options = { ...defaultOptions, ...options };
    this.options.root = this.initRoot();

    this.source = source;
    this.contextLoader = contextLoader;
    this.entities = [];

    this.env = new nunjucks.Environment(
      new Njk(
        this.options.root,
        pathname => this.contextLoader.addDependency(pathname),
      ),
      this.options.configuration,
    );

    this.loadEntities();

    this.compile();
  }

  /**
   * Initializes root
   * @returns {String.root}
   */
  initRoot() {
    const { root } = this.options;
    let result = root;

    if (root) {
      if (typeof root === 'string') {
        result = [root];
      } else if (Array.isArray(root)) {
        result = root;
      }
    } else {
      result = '.';
    }

    return result;
  }

  /**
   * Load entities from entity dir
   * @returns {module.Loader}
   */
  loadEntities() {
    const { env } = this.options;
    const pathname = path.resolve(__dirname, 'entity');

    readdirSync(pathname).forEach((item) => {
      const name = item.split('.')[0];
      /* eslint import/no-dynamic-require: off */
      if (name !== 'index' && hasOwn(env, name)) {
        const Entity = require(path.resolve(pathname, item));
        this.entities.push(new Entity(this.env, env[name]));
      }
    });

    return this;
  }

  /**
   * Compiles njk-file
   * @returns {module.Loader}
   */
  compile() {
    this.compiled = nunjucks.compile(this.source, this.env);

    return this;
  }

  /**
   * Renders file with data object
   * @param {Object} data
   * @returns {Promise<any>}
   */
  render(data) {
    return new Promise((resolve, reject) => {
      this.compiled.render(isNotNullObject(data) ? data : {}, (err, res) => {
        if (err) {
          return reject(err);
        }

        return resolve(res);
      });
    });
  }
};
