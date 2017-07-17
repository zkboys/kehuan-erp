const OrderService = require('../service/order');
const getBaseController = require('./base-controller');

const baseController = getBaseController(OrderService);

module.exports = Object.assign({}, baseController, {
    getByPage(req, res, next){
        const query = {};
        ['status', 'orderNum'].forEach(v => {
            const value = req.query[v];
            if (value) {
                query[v] = new RegExp(value);
            }
        });
        baseController.getByPage(req, res, next, query);
    },
});