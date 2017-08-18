const uuidv4 = require('uuid/v4');
const tools = require('../common/tools');
const OrganizationProxy = require('../proxy/organization');


exports.getById = async function (id) {
    return await OrganizationProxy.getById(id);
};


exports.getAllOrganizations = async function () {
    return await OrganizationProxy.getAllOrganizations();
};

exports.updateAllOrganizations = async function (organizations) {
    return await OrganizationProxy.updateAllOrganizations(organizations)
};

exports.add = async function (data) {
    return await OrganizationProxy.add(data);
};

exports.update = async function (data) {
    return await OrganizationProxy.update(data);
};

exports.deleteById = async function (id) {
    // 删除子级
    const allData = await OrganizationProxy.getAllOrganizations();
    const newData = allData.map(item => {
        return Object.assign({}, {key: String(item._id), parentKey: String(item.parentId)}, item);
    });
    const generations = tools.getGenerationsByKey(newData, String(id));
    const ids = generations.map(item => item._id);
    return await OrganizationProxy.deleteByIds(ids);
};
