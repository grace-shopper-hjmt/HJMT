const router = require('express').Router()
const {Sunglasses} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const sunglasses = await Sunglasses.findAll()
    res.json(sunglasses)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const sunglasses = await Sunglasses.findByPk(req.params.id)
    if (!sunglasses) {
      const err = new Error('sunglasses not found!')
      err.status = 404
      return next(err)
    }
    const {
      id,
      name,
      price,
      imageUrl,
      description,
      inventory,
      brand,
      color,
      shape
    } = await Sunglasses.update({...req.body})
    res.json({
      id,
      name,
      price,
      imageUrl,
      description,
      inventory,
      brand,
      color,
      shape
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const sunglasses = await Sunglasses.findByPk(req.params.id)
    await sunglasses.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
module.exports = router
