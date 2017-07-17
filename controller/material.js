const MaterialService = require('../service/material');
const getBaseController = require('./base-controller');

const baseController = getBaseController(MaterialService);

module.exports = Object.assign({}, baseController, {
    getByPage(req, res, next){
        const query = {};
        ['name'].forEach(v => {
            const value = req.query[v];
            if (value) {
                query[v] = new RegExp(value);
            }
        });
        baseController.getByPage(req, res, next, query);
    },
});