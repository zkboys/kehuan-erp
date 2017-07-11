const OrderModal = require('../models').Order;
const getBaseProxy = require('./base-proxy');

module.exports = Object.assign({}, getBaseProxy(OrderModal), {});

