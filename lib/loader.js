const nunjucks = require('nunjucks');

const Njk = require('./njk');

module.exports = class Loader {
  constructor(source, contextLoader, root = '.') {
    this.source = source;
    this.contextLoader = contextLoader;
    this.root = typeof root === 'string' ? root : '.';
    this.env = new nunjucks.Environment(
      new Njk(
        this.root,
        path => this.contextLoader.addDependency(path),
      ),
    );

    this.compile();
  }

  compile() {
    this.compiled = nunjucks.compile(this.source, this.env);
  }

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
