const router = require('express').Router()
const { Sunglasses } = require('../db/models')

router.get('/', async (req, res, next) => {
   try {
       const sunglasses = await Sunglasses.findAll()
       res.json(sunglasses)
   } catch (error) {
       next(error)
   }
})

module.exports = router