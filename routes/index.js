const express = require('express');
const router = express.Router();

const permission = require('../middlewares/permission');
const userRequired = require('../middlewares/auth').userRequired;

const sign = require('../controller/sign');
const menu = require('../controller/menu');
const organization = require('../controller/organization');
const user = require('../controller/user');
const role = require('../controller/role');

router.get('/', userRequired, function (req, res) {
    res.render('index');
});


router.get('/signin', function (req, res) {
    console.log('signin');
    res.render('signin');
});


// 登录 登出 首次登陆
router.post('/api/signin', sign.login);
router.post('/api/signout', sign.signout);
router.put('/api/first_login', userRequired, sign.firstLogin);

// 菜单
router.get('/api/system/menus', userRequired, menu.getMenus);
router.post('/api/system/menus', userRequired, menu.addMenu);
router.put('/api/system/menus', userRequired, menu.updateMenu);
router.delete('/api/system/menus/:id', userRequired, menu.deleteMenu);

// 组织架构
router.get('/api/system/organizations', userRequired, /*permission('organization-search'),*/ organization.getAll);// 这里不要添加权限限制，也不会产生安全性问题，而且用户相关会用到这个接口。
router.post('/api/system/organizations', userRequired, permission('organization-update'), organization.updateAll);

// 系统
router.put('/api/system/pass', userRequired, /*needCurrentUser*/ user.updatePass);
router.put('/api/system/message', userRequired, /*needCurrentUser*/ user.update);

// 用户
router.get('/api/system/users', userRequired, permission('USER_SEARCH'), user.getByPage);
router.get('/api/system/users/:id', userRequired, user.getById);
router.get('/api/system/users/loginName/:loginName', userRequired, user.getByLoginNameFromAll);
router.post('/api/system/users', userRequired, permission('USER_ADD'), user.addAndSave);
router.put('/api/system/users', userRequired, permission('USER_UPDATE'), user.update);
router.put('/api/system/users/reset_pass', userRequired, permission('USER_RESET_PASS'), user.resetPass);
router.delete('/api/system/users/:id', userRequired, permission('USER_DELETE'), user.delete);
router.put('/api/system/users/toggle_lock', userRequired, permission('USER_TOGGLE_LOCK'), user.toggleLock);

// 角色
router.get('/api/system/roles', userRequired, role.getByPage); // 这里不要添加权限限制，也不会产生安全性问题，而且用户相关会用到这个接口。
router.get('/api/system/roles/all', userRequired, role.getAllRoles); // 这里不要添加权限限制，也不会产生安全性问题，而且用户相关会用到这个接口。
router.get('/api/system/roles/:id', userRequired, role.getById);
router.get('/api/system/roles/name/:name', userRequired, role.getByRoleNameFromAll);
router.post('/api/system/roles', userRequired, permission('ROLE_ADD'), role.addAndSave);
router.put('/api/system/roles', userRequired, permission('ROLE_UPDATE'), role.update);
router.delete('/api/system/roles/:id', userRequired, permission('ROLE_DELETE'), role.delete);

router.get('*', userRequired, function (req, res, next) {
    //  根据约定 区分不同得请求类型，返回不同的数据。
    if (req.path.indexOf('/api') === 0 || req.path.indexOf('/public') === 0) {
        return res.sendError({
            status: 404,
            message: '您访问的资源不存在',
        });
    }
    res.render('index');
});

module.exports = router;