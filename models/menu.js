const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MenuSchema = new Schema({
    key: {type: String},
    parentKey: {type: String},
    order: {type: Number},
    icon: {type: String},
    text: {type: String},
    path: {type: String},
    code: {type: String},
    type: {type: String}, // '0' 菜单 '1' 功能
});

MenuSchema.pre('save', function (next) {
    this.update_at = new Date();
    next();
});
mongoose.model('Menu', MenuSchema);
