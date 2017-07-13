const express = require('express');
const router = express.Router();

const permission = require('../middlewares/permission');
const userRequired = require('../middlewares/auth').userRequired;

const sign = require('../controller/sign');
const menu = require('../controller/menu');
const organization = require('../controller/organization');
const user = require('../controller/user');
const role = require('../controller/role');
const material = require('../controller/material');
const product = require('../controller/product');
const order = require('../controller/order');
// require end 代码生成注释，这个注释不要删除！！！

router.get('/', userRequired, function (req, res) {
    res.render('index');
});


router.get('/signin', function (req, res) {
    res.render('login');
});


// 登录 登出 首次登陆
router.post('/api/signin', sign.login);
router.post('/api/signout', sign.signout);
router.put('/api/first_login', userRequired, sign.firstLogin);

// 菜单
router.get('/api/system/menus', userRequired, menu.getAll);
router.post('/api/system/menus', userRequired, menu.add);
router.put('/api/system/menus', userRequired, menu.update);
router.delete('/api/system/menus/:key', userRequired, menu.deleteByKey);

// 组织架构
router.get('/api/system/organizations', userRequired, organization.getAll);// 这里不要添加权限限制，也不会产生安全性问题，而且用户相关会用到这个接口。
router.post('/api/system/organizations', userRequired, permission('ORGANIZATION_ADD'), organization.add);
router.put('/api/system/organizations', userRequired, permission('ORGANIZATION_UPDATE'), organization.update);
router.delete('/api/system/organizations/:id', userRequired, permission('ORGANIZATION_DELETE'), organization.deleteById);

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

router.get('/api/materials', userRequired, material.getByPage);
router.get('/api/materials/:id', userRequired, material.getById);
router.post('/api/materials', userRequired, permission('MATERIAL_ADD'), material.add);
router.put('/api/materials', userRequired, permission('MATERIAL_UPDATE'), material.update);
router.delete('/api/materials/:id', userRequired, permission('MATERIAL_DELETE'), material.deleteById);

router.get('/api/products', userRequired, product.getByPage);
router.get('/api/products/ids', userRequired, product.getByIds);
router.get('/api/products/:id', userRequired, product.getById);
router.post('/api/products', userRequired, permission('PRODUCT_UPDATE'), product.add);
router.put('/api/products', userRequired, permission('PRODUCT_UPDATE'), product.update);
router.delete('/api/products/:id', userRequired, permission('PRODUCT_UPDATE'), product.deleteById);

router.get('/api/orders', userRequired, order.getByPage);
router.get('/api/orders/:id', userRequired, order.getById);
router.post('/api/orders', userRequired, permission('ORDER_ADD'), order.add);
router.put('/api/orders', permission('ORDER_UPDATE'), userRequired, order.update);
router.delete('/api/orders/:id', userRequired, permission('ORDER_DELETE'), order.deleteById);
// routes end 代码生成注释，这个注释不要删除！！！

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