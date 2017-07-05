/*
 * 代码生成工具
 * cd bin
 * node init.js
 * 注意：重复生成 model/index.js routes/index.js中会有多余代码
 * */
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
const allCapitalName = 'COMPANY';
const pluralityName = 'companies';
const fields = [
    {title: '公司名称', dataIndex: 'name'},
    {title: '地址', dataIndex: 'address'},
];

const config = {
    name,
    capitalName,
    allCapitalName,
    pluralityName,
    fields,
    listTemplate: './list.ejs',
    listDir: path.join(__dirname, `../assets/src/pages/${name}`),
    listFile: 'List.jsx',
    editTemplate: './edit.ejs',
    editDir: path.join(__dirname, `../assets/src/pages/${name}`),
    editFile: 'Edit.jsx',
};

function list(cfg) {
    const existsDir = fs.existsSync(cfg.listDir);
    if (!existsDir) {
        fs.mkdirSync(cfg.listDir);
    }
    const filePath = path.join(cfg.listDir, cfg.listFile);

    generateFile(cfg.listTemplate, cfg, filePath);
}

function edit(cfg) {
    const existsDir = fs.existsSync(cfg.editDir);
    if (!existsDir) {
        fs.mkdirSync(cfg.editDir);
    }
    const filePath = path.join(cfg.editDir, cfg.editFile);

    generateFile(cfg.editTemplate, cfg, filePath);
}

list(config);
edit(config);
