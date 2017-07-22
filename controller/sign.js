const controllerDecorator = require('./controller-decorator');
const config = require('../config');
const authMiddleWare = require('../middlewares/auth');
const userService = require('../service/user');
const roleService = require('../service/role');

exports.login = controllerDecorator(async function (req, res, next) {
    const loginName = req.body.userName;
    const pass = req.body.password;

    const user = await userService.getUserByLoginNameAndPass(loginName, pass);
    const role = await roleService.getRoleById(user.role_id);
    user.permissions = role ? role.permissions : [];
    // 根据用户permissions获取菜单
    const menus = await userService.getUserMenus(user);

    user.permissions = menus.map(item => {
        if (item.type === '0') return item.key;
        if (item.type === '1') return item.code;
        return null;
    });
    const refer = req.session._loginReferer || '/';
    req.session.destroy();
    authMiddleWare.generateUserCookie(user, res);

    res.send({refer, user, menus});
});

exports.firstLogin = controllerDecorator(async function (req, res, next) {
    const currentLoginUser = req.session.user;
    const userId = currentLoginUser._id;
    const oldPass = currentLoginUser.pass;
    const newPass = req.body.pass;
    const newPassRepeat = req.body.rePass;

    const updatedUser = await userService.updatePass(userId, oldPass, newPass, newPassRepeat);
    const menus = await userService.getUserMenus(updatedUser);
    updatedUser.permissions = menus.map(item => {
        if (item.type === '0') return item.key;
        if (item.type === '1') return item.code;
        return null;
    });

    req.session.destroy();
    authMiddleWare.generateUserCookie(updatedUser, res);

    res.send({refer: '/', user: updatedUser, menus: menus});

});

exports.signout = controllerDecorator(function (req, res, next) {
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, {path: '/'});
    res.sendSuccess();
});