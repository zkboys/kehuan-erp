const ProductProxy = require('../proxy/product');
const getBaseService = require('./base-service');

module.exports = Object.assign({}, getBaseService(ProductProxy), {});
