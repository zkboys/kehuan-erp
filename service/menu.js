const uuidv4 = require('uuid/v4');
const MenuProxy = require('../proxy/menu');
const tools = require('../common/tools');

exports.getAll = async function () {
    return await MenuProxy.getAll();
};

exports.updateAll = async function (menus) {
    return await MenuProxy.updateAll(menus);
};

exports.add = async function (menu) {
    menu.key = uuidv4();
    return await MenuProxy.add(menu);
};

exports.update = async function (menu) {
    return await MenuProxy.update(menu);
};

exports.deleteByKey = async function (key) {
    // 删除子级
    const menus = await MenuProxy.getAll();
    const generations = tools.getGenerationsByKey(menus, key);
    const keys = generations.map(item => item.key);
    return await MenuProxy.deleteByKeys(keys);
};
