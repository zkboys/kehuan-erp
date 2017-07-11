const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaModel = new Schema({
    totalPrice: {type: Number}, // 订单总价
    sendUserId: {type: String}, // 发起人
    sendOrgId: {type: String}, // 发起部门
    receiveOrgId: {type: String}, // 接收部门
    sendTime: {type: String}, // 下单日期
    deliveryTime: {type: String}, // 出货日期
    products: {type: Array}, // 产品列表
    remark: {type: String},
});

module.exports = mongoose.model('Order', SchemaModel);
