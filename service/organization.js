const uuidv4 = require('uuid/v4');
const tools = require('../common/tools');
const OrganizationProxy = require('../proxy/organization');

exports.getAllOrganizations = async function () {
    return await OrganizationProxy.getAllOrganizations();
};

exports.updateAllOrganizations = async function (organizations) {
    return await OrganizationProxy.updateAllOrganizations(organizations)
};

exports.add = async function (data) {
    data.key = uuidv4();
    return await OrganizationProxy.add(data);
};

exports.update = async function (data) {
    return await OrganizationProxy.update(data);
};

exports.deleteByKey = async function (key) {
    // 删除子级
    const allData = await OrganizationProxy.getAllOrganizations();
    const generations = tools.getGenerationsByKey(allData, key);
    const keys = generations.map(item => item.key);
    return await OrganizationProxy.deleteByKeys(keys);
};
