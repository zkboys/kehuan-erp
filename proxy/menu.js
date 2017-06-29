const config = require('../config');
const MenuModel = require('../models').Menu;

/**
 * 获取所有菜单
 * @returns {Query|T|*}
 */
exports.getAll = function () {
    return MenuModel.find().lean();
};
/**
 * 跟新所有菜单
 * @param newMenu
 * @returns {Promise|Promise.<TResult>|*}
 */
exports.updateAll = function (newMenu) {
    // TODO 应该用事务处理
    return MenuModel.remove({}).then(() => {
        return MenuModel.create(newMenu);
    });
}
/**
 * 根据用户，获取此用户有权限得菜单
 * @param user
 * @returns {Query|T|*}
 */
exports.getByUser = function (user) {
    if (user.loginName === config.admin_name) { // 登录名为admin的用户拥有所有权限
        return MenuModel.find({}).lean();
    } else {
        return MenuModel.find({'key': {'$in': user.permissions}}).lean();
    }
};

exports.add = function (menu) {
    return new MenuModel(menu).save();
};

exports.update = function (menu) {
    menu.update_at = new Date();
    return MenuModel.findOneAndUpdate({key: menu.key}, menu).lean();
};

exports.deleteByKey = function (key) {
    return MenuModel.remove({key}).lean();
};
exports.deleteByKeys = function (keys) {
    return MenuModel.remove({key: {'$in': keys}}).lean();
};

