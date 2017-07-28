const OrderProxy = require('../proxy/order');
const UserProxy = require('../proxy/user');
const OrgProxy = require('../proxy/organization');
const getBaseService = require('./base-service');
const orderStatus = require('../common/order-status');

module.exports = Object.assign({}, getBaseService(OrderProxy), {
    async getById(id) {
        const order = await OrderProxy.getById(id);
        const sendUser = await UserProxy.getUserById(order.sendUserId);
        const sendOrg = await OrgProxy.getById(order.sendOrgId);
        if (sendUser) order.sendUserName = sendUser.name;
        if (sendOrg) order.sendOrgName = sendOrg.name;
        return order;

    },
    async dealResults(results){
        const sendUserIds = results.map(item => item.sendUserId);
        const sendOrgIds = results.map(item => item.sendOrgId);
        const receiveOrgIds = results.map(item => item.receiveOrgId);
        const receiveUserIds = results.map(item => item.receiveUserId);
        const sendUsers = await UserProxy.getUsersByIds(sendUserIds);
        const sendOrgs = await OrgProxy.getByIds(sendOrgIds);
        const receiveUsers = await UserProxy.getUsersByIds(receiveUserIds);
        const receiveOrgs = await OrgProxy.getByIds(receiveOrgIds);

        return results.map(item => {
            let sendUser;
            for (let i = 0; i < sendUsers.length; i++) {
                if (String(sendUsers[i]._id) === String(item.sendUserId)) {
                    sendUser = sendUsers[i];
                    break;
                }
            }

            let sendOrg;
            for (let i = 0; i < sendOrgs.length; i++) {
                if (String(sendOrgs[i]._id) === String(item.sendOrgId)) {
                    sendOrg = sendOrgs[i];
                    break;
                }
            }

            let receiveUser;
            for (let i = 0; i < receiveUsers.length; i++) {
                if (String(receiveUsers[i]._id) === String(item.receiveUserId)) {
                    receiveUser = receiveUsers[i];
                    break;
                }
            }

            let receiveOrg;
            for (let i = 0; i < receiveOrgs.length; i++) {
                if (String(receiveOrgs[i]._id) === String(item.receiveOrgId)) {
                    receiveOrg = receiveOrgs[i];
                    break;
                }
            }

            let statusName = '';
            for (let i = 0; i < orderStatus.length; i++) {
                if (orderStatus[i].value === item.status) {
                    statusName = orderStatus[i].label;
                    break;
                }
            }
            // find方式不管用了。。。
            // const sendUser = sendUsers.find(i => String(i._id) === String(item.sendUserId));
            // const sendOrg = sendOrgs.find(i => String(i._id) === item.sendOrgId);
            // const receiveUser = receiveUsers.find(i => String(i._id) === item.receiveUserId);
            // const receiveOrg = receiveOrgs.find(i => String(i._id) === item.receiveOrgId);
            return Object.assign({}, item, {
                statusName,
                sendUserName: sendUser ? sendUser.name : '',
                sendOrgName: sendOrg ? sendOrg.name : '',
                receiveUserName: receiveUser ? receiveUser.name : '',
                receiveOrgName: receiveOrg ? receiveOrg.name : '',
            });
        });
    },

    async getByQuery(query, opt) {
        const results = await OrderProxy.getByQuery(query, opt);
        return await this.dealResults(results);
    },

    async getByPage(currentPage = 1, pageSize = 10, queries = {}) {

        const results = await OrderProxy.getByPage(currentPage, pageSize, queries);
        const totalCount = await OrderProxy.getCountByQuery(queries);
        const resu = await this.dealResults(results);

        return {results: resu, totalCount};
    },
});
