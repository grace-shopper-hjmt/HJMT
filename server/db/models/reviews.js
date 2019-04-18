const Sequelize = require('sequelize')
const db = require('../db')

const Reviews = db.define('reviews', {
  title: {
    type: Sequelize.TEXT
  },
  content: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  },
  timestamp: {
    type: Sequelize.DATE
  }
})

module.exports = Reviews
