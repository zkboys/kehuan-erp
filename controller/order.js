const OrderService = require('../service/order');
const ProductService = require('../service/product');
const getBaseController = require('./base-controller');
const controllerDecorator = require('./controller-decorator');

const baseController = getBaseController(OrderService);

module.exports = Object.assign({}, baseController, {
    getByPage(req, res, next){
        const query = {};
        ['orderNum'].forEach(v => {
            const value = req.query[v];
            if (value) {
                query[v] = new RegExp(value);
            }
        });

        if (req.query.status) {
            query.status = req.query.status;
        }

        const currentLoginUser = req.session.user;
        const org_id = currentLoginUser.org_id;
        // 只查询自己部门发出的 和自己部门接收的
        query.$or = [
            {sendOrgId: org_id},
            {receiveOrgId: org_id},
        ];
        baseController.getByPage(req, res, next, query);
    },

    pass: controllerDecorator(async(req, res, next) => {
        const id = req.body.id;
        const order = await OrderService.getById(id);
        order.status = '1';
        const or = await OrderService.update(order);
        return res.send(or);
    }),

    complete: controllerDecorator(async(req, res, next) => {
        const id = req.body.id;
        const order = await OrderService.getById(id);
        order.status = '6';
        const or = await OrderService.update(order);

        // 更改库存
        const products = or.products;
        const ids = products.map(item => item._id);
        const baseProducts = await ProductService.getByIds(ids);
        if (baseProducts && baseProducts.length) {
            for (let i = 0; i < baseProducts.length; i++) {
                const basePro = baseProducts[i];
                for (let j = 0; j < products.length; j++) {
                    if (String(products[j]._id) === String(baseProducts[i]._id)) {
                        basePro.stockCount = basePro.stockCount - products[j].count;
                        basePro.stockTotal = (basePro.stockCount * basePro.singleUnit * 10000) / 10000;
                        console.log(basePro);
                        await ProductService.update(basePro);
                    }
                }
            }
        }

        return res.send(or);
    }),

    reject: controllerDecorator(async(req, res, next) => {
        const {id, rejectReason} = req.body;
        const order = await OrderService.getById(id);
        order.status = '2';
        order.rejectReason = rejectReason;
        const or = await OrderService.update(order);
        return res.send(or);
    }),

    destroy: controllerDecorator(async(req, res, next) => {
        const {id, destroyReason} = req.body;
        const order = await OrderService.getById(id);
        order.status = '3';
        order.destroyReason = destroyReason;
        const or = await OrderService.update(order);
        return res.send(or);
    }),
});