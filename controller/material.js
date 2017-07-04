const controllerDecorator = require('./controller-decorator');
const MaterialService = require('../service/material');

class BaseController {
    constructor(service) {
        this.service = service;

        this.getById = controllerDecorator(async(req, res, next) => {
            const id = req.params.id;
            const data = await this.service.getById(id);
            res.send(data);
        });

        this.add = controllerDecorator(async(req, res, next) => {
                const data = req.body;
                const savedData = await this.service.add(data);
                res.send(savedData);
            }
        );


        this.deleteById = controllerDecorator(async(req, res, next) => {
                const id = req.params.id;
                await this.service.deleteById(id);
                res.sendSuccess();
            }
        );

        this.update = controllerDecorator(async(req, res, next) => {
            const data = req.body;
            const updatedData = await this.service.update(data);
            res.send(updatedData);
        });
    }
}

BaseController.prototype.getByPage = controllerDecorator(async(req, res, next, queryFields = []) => {
        const currentPage = parseInt(req.query.currentPage, 10) || 1;
        const pageSize = Number(req.query.pageSize);
        const queries = {};
        console.log(queryFields);
        queryFields.forEach(v => {
            const value = req.query[v];
            if (value) {
                queries[v] = value;
            }
        });

        console.log(this);
        const {results, totalCount} = await this.service.getByPage(currentPage, pageSize, queries);

        res.send({
            results,
            totalCount,
        });
    }
);

class Controller extends BaseController {
    constructor(service) {
        super(service);
    }

    async getByPage(req, res, next) {
        await super.getByPage(req, res, next, ['name']);
    }
}

module.exports = new Controller(MaterialService);