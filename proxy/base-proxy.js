module.exports = function getBaseProxy(model) {
    return {
        getById(id){
            const query = {
                is_deleted: false,
                _id: id,
            };
            return model.findOne(query).lean();
        },
        getByIds(ids){
            const query = {
                is_deleted: false,
                _id: {'$in': ids},
            };
            return model.find(query).lean();
        },
        getByPage(currentPage = 1, pageSize = 10, queries = {}) {
            const options = {skip: (currentPage - 1) * pageSize, limit: pageSize, sort: '-create_at'};
            const query = {};
            Object.keys(queries).forEach(v => {
                query[v] = new RegExp(queries[v]);
            });
            query.is_deleted = false;
            return model.find(query, '', options).lean();
        },

        getCountByQuery(queries = {}) {
            const query = {};
            Object.keys(queries).forEach(v => {
                query[v] = new RegExp(queries[v]);
            });

            if (query.is_deleted === undefined) {
                query.is_deleted = false;
            }
            return model.count(query);
        },

        getByField(field, value) {
            const query = {
                is_deleted: false,
                [field]: value,
            };
            return model.find(query);
        },

        getByQuery(query, opt) {
            if (query.is_deleted === undefined) {
                query.is_deleted = false;
            }
            return model.find(query, '', opt).lean();
        },

        add(data) {
            return new model(data).save();
        },

        deleteById(id) {
            return model.findOneAndUpdate({_id: id}, {is_deleted: true, update_at: new Date()}).lean()
        },

        update(data) {
            data.update_at = new Date();
            return model.findOneAndUpdate({_id: data._id}, data).lean()
        }
    }
}