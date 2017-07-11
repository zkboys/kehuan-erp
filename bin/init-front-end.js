/*
 * 代码生成工具
 * cd bin
 * node init.js
 * */
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const pluralize = require('pluralize');

function firstUpperCase(str) {
    return str.replace(/\b(\w)(\w*)/g, ($0, $1, $2) => $1.toUpperCase() + $2);
}

const name = 'order';
const ajaxUrl = '/order';
const fields = [
    {title: '发起人', dataIndex: 'sendUserId'},
];

const config = {
    name,
    capitalName: firstUpperCase(name),
    allCapitalName: name.toUpperCase(),
    pluralityName: pluralize(name),
    ajaxUrl,
    fields,
    listTemplate: './list.ejs',
    listDir: path.join(__dirname, `../assets/src/pages/${name}`),
    listFile: 'List.jsx',
    editTemplate: './edit.ejs',
    editDir: path.join(__dirname, `../assets/src/pages/${name}`),
    editFile: 'Edit.jsx',
};

function generateFile(template, cfg, file) {
    ejs.renderFile(template, cfg, (err, content) => {
        fs.writeFileSync(file, content);
    });
}

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
