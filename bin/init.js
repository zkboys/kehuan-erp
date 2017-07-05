const ejs = require('ejs-mate');
const path = require('path');
const fs = require('fs');

function generateFile(template, cfg, file) {
    ejs(template, cfg, (err, content) => {
        fs.writeFileSync(file, content);
    });
}
const name = 'company';
const capitalName = 'Company';
const pluralityName = 'companies';

const config = {
    name,
    capitalName,
    pluralityName,
    modelTemplate: './model.ejs',
    proxyTemplate: './proxy.ejs',
    serviceTemplate: './service.ejs',
    controllerTemplate: './controller.ejs',
    modelFile: path.join(__dirname, `../models/${name}.js`),
    proxyFile: path.join(__dirname, `../proxy/${name}.js`),
    serviceFile: path.join(__dirname, `../service/${name}.js`),
    controllerFile: path.join(__dirname, `../controller/${name}.js`),
};

function model(cfg) {
    generateFile(cfg.modelTemplate, cfg, cfg.modelFile);

    const modelIndexFile = path.join(__dirname, '../models/index.js');
    let content = fs.readFileSync(modelIndexFile, 'utf-8');

    content = content.replace('module.exports = {', `module.exports = {
    ${cfg.capitalName}: require('./${cfg.name}'),`);

    fs.writeFileSync(modelIndexFile, content);
}

function proxy(cfg) {
    generateFile(cfg.proxyTemplate, cfg, cfg.proxyFile);
}


function service(cfg) {
    generateFile(cfg.serviceTemplate, cfg, cfg.serviceFile);
}

function controller(cfg) {
    generateFile(cfg.controllerTemplate, cfg, cfg.controllerFile);
}

function routes(cfg) {
    const routesFile = path.join(__dirname, '../routes/index.js');
    let content = fs.readFileSync(routesFile, 'utf-8');
    content = content.replace('// routes end 代码生成注释，这个注释不要删除！！！', `
router.get('/api/${cfg.pluralityName}', userRequired, ${cfg.name}.getByPage);
router.get('/api/${cfg.pluralityName}/:id', userRequired, ${cfg.name}.getById);
router.post('/api/${cfg.pluralityName}', userRequired, ${cfg.name}.add);
router.put('/api/${cfg.pluralityName}', userRequired, ${cfg.name}.update);
router.delete('/api/${cfg.pluralityName}/:id', userRequired, ${cfg.name}.deleteById);
// routes end 代码生成注释，这个注释不要删除！！！`);

    content = content.replace('// require end 代码生成注释，这个注释不要删除！！！',
        `const ${cfg.name} = require('../controller/${cfg.name}');
// require end 代码生成注释，这个注释不要删除！！！`);

    fs.writeFileSync(routesFile, content);
}

model(config);
proxy(config);
service(config);
controller(config);
routes(config);
