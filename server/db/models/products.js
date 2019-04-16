const Sequelize = require('sequelize')
const db = require('../db')

const Sunglasses = db.define('sunglasses', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: 'https://cdn.shopify.com/s/files/1/0148/9585/products/sunglasses-rose-theater-1_800x.jpg?v=1540248182'
    },
    description: {
        type: Sequelize.TEXT,
    },
    inventory: {
        type: Sequelize.INTEGER
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn: [['black', 'brown']]
        }
    },
    shape: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isIn : [['round', 'square']]
        }
    },
})

module.exports = Sunglasses