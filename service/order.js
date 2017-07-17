const OrderProxy = require('../proxy/order');
const UserProxy = require('../proxy/user');
const OrgProxy = require('../proxy/organization');
const getBaseService = require('./base-service');

module.exports = Object.assign({}, getBaseService(OrderProxy), {
    async getByPage(currentPage = 1, pageSize = 10, queries = {}) {
        const results = await OrderProxy.getByPage(currentPage, pageSize, queries);
        const totalCount = await OrderProxy.getCountByQuery(queries);
        const sendUserIds = results.map(item => item.sendUserId);
        const sendOrgIds = results.map(item => item.sendOrgId);
        const receiveOrgIds = results.map(item => item.receiveOrgId);
        const receiveUserIds = results.map(item => item.receiveUserId);
        const sendUsers = await UserProxy.getUsersByIds(sendUserIds);
        const sendOrgs = await OrgProxy.getByIds(sendOrgIds);
        const receiveUsers = await UserProxy.getUsersByIds(receiveUserIds);
        const receiveOrgs = await OrgProxy.getByIds(receiveOrgIds);
        const resu = results.map(item => {
            const sendUser = sendUsers.find(i => String(i._id) === item.sendUserId);
            const sendOrg = sendOrgs.find(i => String(i._id) === item.sendOrgId);
            const receiveUser = receiveUsers.find(i => String(i._id) === item.receiveUserId);
            const receiveOrg = receiveOrgs.find(i => String(i._id) === item.receiveOrgId);
            return Object.assign({}, item, {
                sendUserName: sendUser ? sendUser.name : '',
                sendOrgName: sendOrg ? sendOrg.name : '',
                receiveUserName: receiveUser ? receiveUser.name : '',
                receiveOrgName: receiveOrg ? receiveOrg.name : '',
            });
        });
        return {results: resu, totalCount};
    },
});
