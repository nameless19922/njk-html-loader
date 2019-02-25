const fs = require('fs');
const path = require('path');

/**
 * NjkLoader class
 * @type {module.NjkLoader}
 */
module.exports = class NjkLoader {
  constructor(context, sourceCallback) {
    this.context = context;
    this.sourceCallback = sourceCallback;
  }

  /**
   * Get source from njk-file
   * @param {string} filePath
   * @returns {(null|Object)}
   */
  getSource(filePath) {
    let resultPath = null;

    this.context.some((item) => {
      const completePath = path.resolve(item, filePath);

      if (fs.existsSync(completePath)) {
        resultPath = completePath;
        return true;
      }

      return false;
    });

    if (resultPath === null) {
      return null;
    }

    this.sourceCallback(resultPath);

    return {
      src: fs.readFileSync(resultPath, 'utf-8'),
      path: resultPath,
    };
  }
};
