const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Welcome!', { dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;