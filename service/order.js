const OrderProxy = require('../proxy/order');
const getBaseService = require('./base-service');

module.exports = Object.assign({}, getBaseService(OrderProxy), {});
