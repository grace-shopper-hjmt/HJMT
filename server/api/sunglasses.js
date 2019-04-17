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
router.delete('/:id', async (req, res, next) => {
  try {
    const sunglasses = await Sunglasses.findById(req.params.id)
    await sunglasses.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
module.exports = router
