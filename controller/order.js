const path = require('path');
const moment = require('moment');
const nodeExcel = require('excel-export');
const OrderService = require('../service/order');
const ProductService = require('../service/product');
const orgService = require('../service/organization');
const userService = require('../service/user');
const getBaseController = require('./base-controller');
const controllerDecorator = require('./controller-decorator');
const sendMail = require('../mail/mail');
const orderStatus = require('../common/order-status');
const units = require('../common/units');

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

    add: controllerDecorator(async(req, res, next) => {
            const data = req.body;
            const savedData = await OrderService.add(data);
            const {receiveOrgId} = savedData;
            const reOrg = await orgService.getById(receiveOrgId);
            const admin = await userService.getUserByLoginNameFromAllUsers('admin');

            // 说明是顶节点，科环总部，超级管理员存在，给超级管理员发邮件
            if (admin && admin.email && !reOrg.parentId) {
                let statusLabel;
                for (let i = 0; i < orderStatus.length; i++) {
                    if (orderStatus[i].value === savedData.status) {
                        statusLabel = orderStatus[i].label;
                        break;
                    }
                }
                const sendOrg = await orgService.getById(savedData.sendOrgId);
                const sendOrgName = sendOrg && sendOrg.name;
                const sendUser = await userService.getUserById(savedData.sendUserId);
                const sendUserName = sendUser && (sendUser.name || sendUser.loginName);
                const ptr = [];
                for (let i = 0; i < savedData.products.length; i++) {
                    const product = savedData.products[i];
                    const name = product.name;
                    const spec = product.spec;
                    const model = product.model;
                    let unitCode = product.unit;
                    let unit;
                    for (let j = 0; j < units.length; j++) {
                        if (units[j].code === unitCode) {
                            unit = units[j];
                            break;
                        }
                    }
                    const unitName = unit.name;
                    const unitShortName = unit.shortName;
                    const singleUnit = `${product.singleUnit}${unitShortName}`;
                    const count = product.count;

                    const value = product.singleUnit * 10000 * count; // 避免js精度问题
                    const total = unit ? `${value / 10000}${unitShortName}` : value;
                    ptr.push(`
                        <tr>
                            <td>${name}</td>
                            <td>${spec}</td>
                            <td>${model}</td>
                            <td>${unitName}</td>
                            <td>${singleUnit}</td>
                            <td>${count}</td>
                            <td>${total}</td>
                        </tr>
                    `);
                }
                let html = `
                    <div>
                        <div style="test-align: left">
                            <span style="display: inline-block; padding: 8px 16px">
                                <span style="display: inline-block; width: 80px; text-align: right">订单编号：</span>
                                <span style="display: inline-block; width: 160px text-align: left">${savedData.orderNum}</span>
                            </span>
                        </div>
                        <div style="test-align: left">    
                            <span style="display: inline-block; padding: 8px 16px">
                                <span style="display: inline-block; width: 80px; text-align: right">订单状态：</span>
                                <span style="display: inline-block; width: 160px text-align: left">${statusLabel}</span>
                            </span>
                        </div>
                        <div style="test-align: left">
                            <span style="display: inline-block; padding: 8px 16px">
                                <span style="display: inline-block; width: 80px; text-align: right">出货日期：</span>
                                <span style="display: inline-block; width: 160px text-align: left">${moment(savedData.deliveryTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                            </span>
                        </div>
                        <div style="test-align: left">
                            <span style="display: inline-block; padding: 8px 16px">
                                <span style="display: inline-block; width: 80px; text-align: right">发起部门：</span>
                                <span style="display: inline-block; width: 160px text-align: left">${sendOrgName}</span>
                            </span>
                        </div>
                        <div style="test-align: left">
                            <span style="display: inline-block; padding: 8px 16px">
                                <span style="display: inline-block; width: 80px; text-align: right">发起人：</span>
                                <span style="display: inline-block; width: 160px text-align: left">${sendUserName}</span>
                            </span>
                        </div>
                        <table border="1">
                            <tr>
                                <td>名称</td>
                                <td>规格</td>
                                <td>型号</td>
                                <td>单位</td>
                                <td>单个总量</td>
                                <td>数量</td>
                                <td>总量</td>
                            </tr>
                            ${ptr.join('')}
                        </table>
                    </div>
                `;

                sendMail(admin.email, '总部接到新订单', html);
            }
            res.send(savedData);
        }
    ),
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