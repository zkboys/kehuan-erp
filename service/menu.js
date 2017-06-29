const uuidv4 = require('uuid/v4');
const MenuProxy = require('../proxy/menu');
const cloneDeep = require('lodash').cloneDeep;

exports.getAllMenus = async function () {
    return await MenuProxy.getAllMenus();
};

exports.updateAllMenus = async function (menus) {
    return await MenuProxy.updateAllMenus(menus);
};

exports.addMenu = async function (menu) {
    menu.key = uuidv4();
    return await MenuProxy.addMenu(menu);
};

exports.updateMenu = async function (menu) {
    return await MenuProxy.updateMenu(menu);
};

exports.deleteMenuByKeys = async function (key) {
    // 删除子级
    const menus = await MenuProxy.getAllMenus();
    const generations = getGenerationsByKey(menus, key);
    const keys = generations.map(item => item.key);
    return await MenuProxy.deleteMenuByKeys(keys);
};


/**
 * 根据key，查询其所有后代节点，一般会用于删除
 * @param {Array} rows 具有key，parentKey关系的扁平数据结构
 * @param {object} key 要查询的节点 key
 * @returns {Array}
 */
function getGenerationsByKey(rows, key) {
    // 这个函数会被多次调用，对rows做深拷贝，否则会产生副作用。
    rows = cloneDeep(rows);
    const parentNode = rows.find(item => item.key === key);
    if (!parentNode) return [];


    let nodes = [parentNode];
    let generationNodes = [cloneDeep(parentNode)];

    // 存放要处理的节点
    let toDo = nodes.map((v) => v);

    while (toDo.length) {
        // 处理一个，头部弹出一个。
        let node = toDo.shift();
        // 获取子节点。
        rows.forEach(row => {
            if (row.parentKey === node.key) {
                let child = cloneDeep(row);
                generationNodes.push(child);
                // child加入toDo，继续处理
                toDo.push(child);
            }
        });
    }
    return generationNodes;
}
