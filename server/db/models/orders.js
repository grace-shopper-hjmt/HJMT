const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orders', {
  quantity: {
    type:Sequelize.INTEGER
  },
  price: {
    type:Sequelize.INTEGER
  },
  timestamp: {
    type:Sequelize.DATE
  },
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed')
  },
  paymentMethod: {
    type: Sequelize.INTEGER,
    validate: {
      isCreditCard: true
    }
  }
})

module.exports = OrderItem
