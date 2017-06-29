const OrganizationModel = require('../models').Organization;

/**
 * 获取所有组织架构数据
 * @returns {T|*|Query}
 */
exports.getAllOrganizations = function () {
    return OrganizationModel.find().lean();
};
/**
 * 更新全部
 * @param newOrganizations
 * @returns {Promise.<TResult>|Promise|*}
 */
exports.updateAllOrganizations = function (newOrganizations) {
    // TODO 应该用事务处理
    return OrganizationModel.remove({}).then(() => {
        return OrganizationModel.create(newOrganizations);
    });
};

exports.add = function (data) {
    return new OrganizationModel(data).save();
};


exports.update = function (data) {
    data.update_at = new Date();
    return OrganizationModel.findOneAndUpdate({key: data.key}, data).lean();
};

exports.deleteByKey = function (key) {
    return OrganizationModel.remove({key}).lean();
};

exports.deleteByKeys = function (keys) {
    return OrganizationModel.remove({key: {'$in': keys}}).lean();
};
