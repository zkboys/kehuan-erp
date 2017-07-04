const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaModel = new Schema({
    name: {type: String},
    permissions: {type: Array},
    description: {type: String},
    status: {type: String},
});

module.exports = mongoose.model('Role', SchemaModel);
