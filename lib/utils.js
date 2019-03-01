function hasOwn(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function isNotNullObject(obj) {
  return typeof obj === 'object' && obj !== null;
}

module.exports = { hasOwn, isNotNullObject };
