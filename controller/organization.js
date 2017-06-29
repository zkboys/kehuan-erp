const OrganizationService = require('../service/organization');
const controllerDecorator = require('./controller-decorator');

exports.getAll = controllerDecorator(async function (req, res, next) {
    const organizations = await OrganizationService.getAllOrganizations();
    res.send(organizations);
});

exports.add = controllerDecorator(async function (req, res, next) {
    const data = req.body;
    const savedData = await OrganizationService.add(data);
    res.send(savedData);
});

exports.update = controllerDecorator(async function (req, res, next) {
    const data = req.body;
    const updatedData = await OrganizationService.update(data);
    res.send(updatedData);
});


exports.deleteByKey = controllerDecorator(async function (req, res, next) {
    const key = req.params.key;
    await OrganizationService.deleteByKey(key);
    res.sendSuccess();
});
