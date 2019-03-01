const Entity = require('./');

/**
 * Filters Entity
 * @type {module.Filters}
 */
module.exports = class Filters extends Entity {
  /**
   * Represents filters
   * @param {Njk} env
   * @param {Object} fns
   */
  constructor(env, fns) {
    super(env);

    this.init(fns);
  }

  /**
   * Initializes custom filters
   * @param {Object} fns
   */
  init(fns) {
    if (typeof fns === 'object' && fns !== null) {
      const filtersKeys = Object.keys(fns);

      if (filtersKeys.length) {
        filtersKeys.forEach(item => this.addFilter(item, fns[item]));
      }
    }
  }

  /**
   * Add custom filter to environment
   * @param {string} name
   * @param {Function} fn
   */
  addFilter(name, fn) {
    this.env.addFilter(name, fn);

    return this;
  }
};
