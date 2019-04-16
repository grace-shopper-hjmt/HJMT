const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('orders', {
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
  billingAddress: {
    type: Sequelize.TEXT,
  },
  shippingAddress: {
    type: Sequelize.TEXT
  }
})

module.exports = Orders
