const Entity = require('./');

/**
 * Filters Entity
 * @type {module.Extensions}
 */
module.exports = class Extensions extends Entity {
  /**
   * Represents filters
   * @param {Njk} env
   * @param {Object} exts
   */
  constructor(env, exts) {
    super(env);

    this.init(exts);
  }

  /**
   * Initializes extensions
   * @param {Object} exts
   */
  init(exts) {
    if (typeof exts === 'object' && exts !== null) {
      const filtersKeys = Object.keys(exts);

      if (filtersKeys.length) {
        filtersKeys.forEach(item => this.addFilter(item, exts[item]));
      }
    }
  }

  /**
   * Add extension to environment
   * @param {string} name
   * @param {Function} extension
   */
  addExtension(name, extension) {
    this.env.addExtension(name, extension);

    return this;
  }
};
