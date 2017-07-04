const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaModel = new Schema({
    key: {type: String}, // 业务关联要使用key，不要使用_id,_id总是变化
    parentKey: {type: String},
    name: {type: String},
    description: {type: String},
    order: {type: Number},
});

SchemaModel.index({key: 1}, {unique: true});

module.exports = mongoose.model('Organization', SchemaModel);
