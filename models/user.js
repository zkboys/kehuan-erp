const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaModel = new Schema({
    name: {type: String},
    loginName: {type: String},
    pass: {type: String},
    salt: {type: String},
    email: {type: String},
    mobile: {type: String},
    gender: {type: String},
    avatar: {type: String},
    position: {type: String},
    role_id: {type: String},
    is_first_login: {type: Boolean, default: true},
    org_id: {type: String},
    is_locked: {type: Boolean, default: false},
});

SchemaModel.index({loginName: 1}, {unique: true});

module.exports = mongoose.model('User', SchemaModel);
