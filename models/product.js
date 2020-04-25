const Sequalize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequalize.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: Sequalize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequalize.STRING,
        allowNull: false,
    },
});

module.exports = Product;
