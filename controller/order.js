const OrderService = require('../service/order');
const getBaseController = require('./base-controller');

const baseController = getBaseController(OrderService);

module.exports = Object.assign({}, baseController, {
    getByPage(req, res, next){
        const query = {};
        ['name'].forEach(v => {
            const value = req.query[v];
            if (value) {
                query[v] = value;
            }
        });
        baseController.getByPage(req, res, next, query);
    },
});