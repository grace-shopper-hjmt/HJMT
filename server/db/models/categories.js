const Sequelize = require('sequelize')
const db = require('../db')

const Categories = db.define('categories', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    type: {
        type: Sequelize.STRING,
        defaultValue: 'Misc'
    }
})

module.exports = Categories