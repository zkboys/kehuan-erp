const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaModel = new Schema({
    name: {type: String},
    spec: {type: String}, // 规格
    unit: {type: String}, // 单位
    unitPrice: {type: String}, // 单价
    remark: {type: String},
});

module.exports = mongoose.model('Material', SchemaModel);
