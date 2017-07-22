const OrganizationModel = require('../models').Organization;

/**
 * 获取所有组织架构数据
 * @returns {T|*|Query}
 */
exports.getAllOrganizations = function () {
    return OrganizationModel.find().lean();
};


exports.getById = function (id) {
    return OrganizationModel.findOne({'_id': id}).lean();
};

exports.getByIds = function (ids) {
    return OrganizationModel.find({'_id': {'$in': ids}}).lean();
};


/**
 * 更新全部
 * @param newOrganizations
 * @returns {Promise.<TResult>|Promise|*}
 */
exports.updateAllOrganizations = function (newOrganizations) {
    return OrganizationModel.remove({}).then(() => {
        return OrganizationModel.create(newOrganizations);
    });
};

exports.add = function (data) {
    return new OrganizationModel(data).save();
};


exports.update = function (data) {
    data.update_at = new Date();
    return OrganizationModel.findOneAndUpdate({_id: data.key}, data).lean();
};

exports.deleteById = function (id) {
    return OrganizationModel.remove({id}).lean();
};

exports.deleteByIds = function (ids) {
    return OrganizationModel.remove({_id: {'$in': ids}}).lean();
};
