const ProductModal = require('../models').Product;
const getBaseProxy = require('./base-proxy');

module.exports = Object.assign({}, getBaseProxy(ProductModal), {});

