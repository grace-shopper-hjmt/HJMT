/* eslint-disable guard-for-in */
const router = require('express').Router()
const Sequelize = require('sequelize')
const {Sunglasses, Reviews, Categories} = require('../db/models')
const { isAdmin} = require('./auth-middleware')
router.get('/', async (req, res, next) => {
  try {
    const sunglasses = await Sunglasses.findAll({
      order: [Sequelize.col('id')],
      include: [{
        model: Categories,
        attributes: ['id', 'name', 'type']
      }]
    })
    res.json(sunglasses)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const sunglasses = await Sunglasses.findByPk(req.params.id, {
      include: [{model: Reviews}, {model: Categories}]
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

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const categories = req.body.categories
    const sunglasses = await Sunglasses.create(req.body.sunglassesAtt)
    if (sunglasses.price / 100 < 50) {
      categories.price = '$0-$50'
    } else if (sunglasses.price / 100 < 100) {
      categories.price = '$51-$100'
    } else {
      categories.price = '$101+'
    }
    for (let key in categories) {
      let category = await Categories.findOrCreate({
        where: {
          type: key,
          name: categories[key]
        }
      })
      sunglasses.addCategories(`${category[0].id}`)
    }
    res.json(sunglasses)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const sunglasses = await Sunglasses.findByPk(req.params.id, {
      include: [{model: Reviews}, {model: Categories}]
    })
    if (!sunglasses) {
      const err = new Error('sunglasses not found!')
      err.status = 404
      return next(err)
    }
    sunglasses.removeCategory(Categories)
    const newCategories = req.body.categories
    const updatedSunglasses = await sunglasses.update(req.body.sunglassesAtt)
    for (let key in newCategories) {
      let category = await Categories.findOrCreate({
        where: {
          type: key,
          name: newCategories[key]
        }
      })
      updatedSunglasses.addCategories(`${category[0].id}`)
    }
    res.json({
      updatedSunglasses
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const sunglasses = await Sunglasses.findByPk(req.params.id)
    await sunglasses.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
module.exports = router
