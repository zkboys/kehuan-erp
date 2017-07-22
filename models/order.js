const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaModel = new Schema({
    orderNum: String, // 订单编号
    status: {type: String}, // 订单状态： 0 审核中 1 审核通过 2 驳回 3 作废 4 生产中 5 配送中 6 已完成
    totalPrice: {type: Number}, // 订单总价
    discount: Number, // 优惠总价
    afterDiscountTotalPrice: Number, // 订单优惠后总价
    sendUserId: {type: String}, // 发起人
    sendOrgId: {type: String}, // 发起部门
    receiveOrgId: {type: String}, // 接收部门
    receiveUserId: {type: String}, // 接收人，如果没有指定接收人，就直接到部门，部门下所有人员都可见
    sendTime: {type: Date}, // 下单日期
    deliveryTime: {type: Date}, // 出货日期
    products: {type: Array}, // 产品列表
    remark: {type: String}, // 备注
    rejectReason: {type: String}, // 驳回原因
    destroyReason: {type: String}, // 作废原因
    operatorHistory: {type: Array}, // 操作历史 receiveOrgId receiveOrgId status 是操作历史中最后信息
});

module.exports = mongoose.model('Order', SchemaModel);
