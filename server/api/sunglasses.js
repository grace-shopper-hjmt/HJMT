const router = require('express').Router()
const {Sunglasses, Reviews} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const sunglasses = await Sunglasses.findAll()
    res.json(sunglasses)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const sunglasses = await Sunglasses.findByPk(req.params.id, {
      include: [{model: Reviews}]
    })

    if (!sunglasses) {
      const error = new Error('This pair of sunglasses does not exist!')
      error.status = 404
      next(error)
    } else {
      res.json(sunglasses)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const sunglasses = await Sunglasses.create(req.body)
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
    const updatedSunglasses = await Sunglasses.update(req.body, { where: { id: req.params.id } })
    res.json({
      updatedSunglasses
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
