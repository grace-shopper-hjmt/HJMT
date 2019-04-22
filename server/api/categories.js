const router = require('express').Router()
const Sequelize = require("sequelize");
const { Sunglasses, Reviews, Categories } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
      const categories = await Categories.findAll({
        attributes: ['name', 'type']
      })
      res.json(categories)
    } catch (error) {
      next(error)
    }
})
