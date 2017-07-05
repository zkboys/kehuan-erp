const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../common/logger');
const BaseModel = require('./base_model');

mongoose.connect(
    config.db,
    {
        server: {poolSize: 20},
    },
    (err) => {
        if (err) {
            logger.error('connect to %s error: ', config.db, err.message);
            process.exit(1);
        }
    }
);

mongoose.plugin(BaseModel);

module.exports = {
    Menu: require('./menu'),
    Role: require('./role'),
    User: require('./user'),
    Organization: require('./organization'),
    Material: require('./material'),
    Product: require('./product'),
};