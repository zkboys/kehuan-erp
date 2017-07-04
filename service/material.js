const MaterialProxy = require('../proxy/material');

class BaseService {
    constructor(proxy) {
        this.proxy = proxy;
    }

    async getById(id) {
        return await this.proxy.getById(id);
    }

    async getByPage(currentPage = 1, pageSize = 10, queries = {}) {
        const results = await this.proxy.getByPage(currentPage, pageSize, queries);
        const totalCount = await this.proxy.getCountByQuery(queries);
        return {results, totalCount};
    }

    async getByField(field, value) {
        return await this.proxy.getByField(field, value);
    }

    async getByQuery(query, opt) {
        return await this.proxy.getByQuery(query, opt);
    }

    async add(data) {
        return await his.proxy.add(data);
    }

    async deleteById(id) {
        return await this.proxy.deleteById(id);
    }

    async update(data) {
        return await this.proxy.deleteById(data);
    }
}

class Service extends BaseService {
    constructor(proxy) {
        super(proxy);
    }
}

module.exports = new Service(MaterialProxy);
