const ProductService = require('../service/product');
const getBaseController = require('./base-controller');

const baseController = getBaseController(ProductService);

module.exports = Object.assign({}, baseController, {
    getByPage(req, res, next){
        const query = {};
        ['name', 'spec', 'model'].forEach(v => {
            const value = req.query[v];
            if (value) {
                query[v] = new RegExp(value);
            }
        });

        baseController.getByPage(req, res, next, query);
    },
});