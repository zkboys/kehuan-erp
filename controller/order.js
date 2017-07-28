const path = require('path');
const moment = require('moment');
const nodeExcel = require('excel-export');
const OrderService = require('../service/order');
const ProductService = require('../service/product');
const getBaseController = require('./base-controller');
const controllerDecorator = require('./controller-decorator');

const baseController = getBaseController(OrderService);

function getQuery(req) {
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

    let {startDate, endDate} = req.query;
    if (startDate && endDate) {
        startDate = `${startDate} 00:00:00`;
        endDate = `${endDate} 23:59:59`;
        query.deliveryTime = {
            $gte: new Date(Date.parse(startDate.replace(/-/g, "/"))),
            $lte: new Date(Date.parse(endDate.replace(/-/g, "/"))),
        };
    }

    // 只查询自己部门发出的 和自己部门接收的
    const currentLoginUser = req.session.user;
    const org_id = currentLoginUser.org_id;
    query.$or = [
        {sendOrgId: org_id},
        {receiveOrgId: org_id},
    ];
    return query;
}

module.exports = Object.assign({}, baseController, {
    getByPage(req, res, next){
        const query = getQuery(req);
        baseController.getByPage(req, res, next, query);
    },

    exportExcel: controllerDecorator(async(req, res, next) => {
        const query = getQuery(req);
        const orders = await OrderService.getByQuery(query);
        const conf = {};
        conf.stylesXmlFile = path.join(__dirname, 'styles.xml');
        conf.name = 'orders'; // 这个不能是中文
        conf.cols = [
            {caption: '订单编号', type: 'string'},
            {caption: '订单总价', type: 'number'},
            {caption: '优惠金额', type: 'number'},
            {caption: '优惠后总价', type: 'number'},
            {caption: '发起人', type: 'string'},
            {caption: '发起部门', type: 'string'},
            // {caption: '接收人', type: 'string'},
            {caption: '接收部门', type: 'string'},
            {caption: '下单日期', type: 'string', width: 120},
            {caption: '出货日期', type: 'string'},
            {caption: '驳回原因', type: 'string'},
            {caption: '作废原因', type: 'string'},
            {caption: '状态', type: 'string'},
            {caption: '备注', type: 'string'},
        ];
        conf.rows = [];
        if (orders && orders.length) {
            const format = 'YYYY-MM-DD HH:mm:ss';
            conf.rows = orders.map(item => {
                const sendUser = item.sendUserName;
                const sendOrg = item.sendOrgName;
                const receiveUser = item.receiveUserName;
                const receiveOrg = item.receiveOrgName;
                const sendTime = item.sendTime ? moment(item.sendTime).format(format) : '';
                const deliveryTime = item.deliveryTime ? moment(item.deliveryTime).format(format) : '';
                return [
                    item.orderNum || '',
                    item.totalPrice || '',
                    item.discount || '',
                    item.afterDiscountTotalPrice || '',
                    sendUser || '',
                    sendOrg || '',
                    // receiveUser || '',
                    receiveOrg || '',
                    sendTime || '',
                    deliveryTime || '',
                    item.rejectReason || '',
                    item.destroyReason || '',
                    item.statusName || '',
                    item.remark || '',
                ];
            });
        }
        const result = nodeExcel.execute(conf);
        const fileName = `orders_${Date.now()}.xlsx`;
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
        res.end(result, 'binary');
    }),


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