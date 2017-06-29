const MenuService = require('../service/menu');
const controllerDecorator = require('./controller-decorator');

exports.getMenus = controllerDecorator(async function (req, res) {
    const menus = await MenuService.getAllMenus();
    res.send(menus);
});

exports.updateMenu = controllerDecorator(async function (req, res, next) {
    const menu = req.body;
    const updatedMenu = await MenuService.updateMenu(menu);
    res.send(updatedMenu);
});


exports.addMenu = controllerDecorator(async function (req, res, next) {
    const menu = req.body;
    console.log(req.body);
    const savedMenu = await MenuService.addMenu(menu);
    res.send(savedMenu);
});


exports.deleteMenu = controllerDecorator(async function (req, res, next) {
    const key = req.params.id;
    await MenuService.deleteMenuByKeys(key);
    res.sendSuccess();
});

