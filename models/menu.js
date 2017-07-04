const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaModel = new Schema({
    key: {type: String},
    parentKey: {type: String},
    order: {type: Number},
    icon: {type: String},
    text: {type: String},
    path: {type: String},
    code: {type: String},
    type: {type: String}, // '0' 菜单 '1' 功能
});

module.exports = mongoose.model('Menu', SchemaModel);
