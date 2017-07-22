const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaModel = new Schema({
    name: {type: String},
    spec: {type: String}, // 规格
    model: {type: String}, // 型号
    unit: {type: String}, // 单位 平米
    unitPrice: {type: String}, // 单价
    singleUnit: {type: String}, // 单个总量 平米
    singleUnitPrice: {type: String}, // 单个总价
    stockCount: Number, // 库存总数
    stockTotal: Number, // 库存总量
    remark: {type: String},
});

module.exports = mongoose.model('Product', SchemaModel);
