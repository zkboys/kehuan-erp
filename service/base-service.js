module.exports = function getBaseService(proxy) {
    return {
        async getById(id) {
            return await proxy.getById(id);
        },

        async getByIds(ids) {
            return await proxy.getByIds(ids);
        },

        async getByPage(currentPage = 1, pageSize = 10, queries = {}) {
            const results = await proxy.getByPage(currentPage, pageSize, queries);
            const totalCount = await proxy.getCountByQuery(queries);
            return {results, totalCount};
        },

        async getByField(field, value) {
            return await proxy.getByField(field, value);
        },

        async getByQuery(query, opt) {
            return await proxy.getByQuery(query, opt);
        },

        async add(data) {
            return await proxy.add(data);
        },

        async deleteById(id) {
            return await proxy.deleteById(id);
        },

        async update(data) {
            return await proxy.update(data);
        },
    };
}
