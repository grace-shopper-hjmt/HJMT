const router = require('express').Router()
const { OrderItem } = require('../db/models')

router.post('/', async (req, res, next) => {
    try {
            const newOrders = await OrderItem.bulkCreate(req.body.orderItems, {returning: true})
            res.json(newOrders)
        
    } catch (error) {
        next(error)
    }
})

module.exports = router
