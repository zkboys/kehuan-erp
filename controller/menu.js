const MenuService = require('../service/menu');
const controllerDecorator = require('./controller-decorator');

exports.getAll = controllerDecorator(async function (req, res) {
    const menus = await MenuService.getAll();
    res.send(menus);
});

exports.update = controllerDecorator(async function (req, res, next) {
    const menu = req.body;
    const updatedMenu = await MenuService.update(menu);
    res.send(updatedMenu);
});


exports.add = controllerDecorator(async function (req, res, next) {
    const menu = req.body;
    console.log(req.body);
    const savedMenu = await MenuService.add(menu);
    res.send(savedMenu);
});


exports.deleteByKey = controllerDecorator(async function (req, res, next) {
    const key = req.params.key;
    await MenuService.deleteByKey(key);
    res.sendSuccess();
});

