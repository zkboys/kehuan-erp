const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaModel = new Schema({
    parentId: Schema.Types.ObjectId,
    name: String,
    description: String,
    order: Number,
});

module.exports = mongoose.model('Organization', SchemaModel);
