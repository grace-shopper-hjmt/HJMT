const router = require('express').Router()
const {OrderItem, Sunglasses} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await OrderItem.findAll()
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const order = await OrderItem.findByPk(req.params.id)
    if (!order) {
      const error = new Error('This order does not exist!')
      error.status = 404
      next(error)
    } else {
      res.json(order)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newOrders = await OrderItem.bulkCreate(req.body.orderItems, {
      returning: true
    })
    newOrders.forEach(async item => {
      let sunglasses = await Sunglasses.findByPk(item.sunglassId)
      let currentInventory = sunglasses.inventory
      await sunglasses.update({inventory: currentInventory - item.quantity})
    })
    res.json(newOrders)
  } catch (error) {
    next(error)
  }
})

module.exports = router
