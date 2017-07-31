const bcrypt = require('bcryptjs');
const moment = require('moment');
const cloneDeep = require('lodash').cloneDeep;

moment.locale('zh-cn'); // 使用中文


exports.validateId = function (str) {
    return (/^[a-zA-Z0-9\-_]+$/i).test(str);
};

// 格式化时间
exports.formatDate = function (date, friendly) {
    date = moment(date);

    if (friendly) {
        return date.fromNow();
    } else {
        return date.format('YYYY-MM-DD HH:mm');
    }

};

exports.bhash = function (str) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(str, 10, (error, passhash) => {
            if (error) {
                reject(error);
            } else {
                resolve(passhash);
            }
        });
    });
};


exports.bcompare = function (str, hash) {

    return new Promise((resolve, reject) => {
        bcrypt.compare(str, hash, (error, bool) => {
            if (error) {
                reject(error);
            } else {
                resolve(bool);
            }
        });
    });
};


/**
 * 根据key，查询其所有后代节点，一般会用于删除
 * @param {Array} rows 具有key，parentKey关系的扁平数据结构
 * @param {object} key 要查询的节点 key
 * @returns {Array}
 */
exports.getGenerationsByKey = function (rows, key) {
    // 这个函数会被多次调用，对rows做深拷贝，否则会产生副作用。
    rows = cloneDeep(rows);

    let parentNode;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].key === key) {
            parentNode = rows[i];
            break;
        }
    }

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


