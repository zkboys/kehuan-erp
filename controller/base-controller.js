const controllerDecorator = require('./controller-decorator');

module.exports = function getBaseController(service) {
    return {
        getById: controllerDecorator(async(req, res, next) => {
            const id = req.params.id;
            const data = await service.getById(id);
            res.send(data);
        }),

        getByIds: controllerDecorator(async(req, res, next) => {
            let ids = req.query.ids;
            if (ids) ids = ids.split(',');
            const data = await service.getByIds(ids);
            res.send(data);
        }),

        getByPage: controllerDecorator(async(req, res, next, query) => {
                const currentPage = parseInt(req.query.currentPage, 10) || 1;
                const pageSize = Number(req.query.pageSize);

                const {results, totalCount} = await service.getByPage(currentPage, pageSize, query);
                res.send({
                    results,
                    totalCount,
                });
            }
        ),

        add: controllerDecorator(async(req, res, next) => {
                const data = req.body;
                const savedData = await service.add(data);
                res.send(savedData);
            }
        ),

        deleteById: controllerDecorator(async(req, res, next) => {
                const id = req.params.id;
                await service.deleteById(id);
                res.sendSuccess();
            }
        ),

        update: controllerDecorator(async(req, res, next) => {
            const data = req.body;
            const updatedData = await service.update(data);
            res.send(updatedData);
        }),
    };
}