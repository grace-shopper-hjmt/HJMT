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
        defaultValue: 'https://www.freepngimg.com/thumb/sunglasses/8-2-sunglasses-png-image.png'
    },
    description: {
        type: Sequelize.TEXT,
    },
    inventory: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
        }
    },
})

// Sunglasses.beforeCreate((sunglasses, options) => {
//     if (sunglasses.price < 50) {
//         sunglasses.addCategories('1')
//     } else if (sunglasses.price > 50 && sunglasses.price < 100) {
//         sunglasses.addCategories('2')
//     } else {
//         sunglasses.addCategories('3')
//     }
// })
module.exports = Sunglasses
