//how to handle carts for logged in users and users that aren't logged in?
const router = require('express').Router()
const Sequelize = require('sequelize')
const { CartItems } = require('../db/models')

router.get('/', async (req, res, next) => {
    try {
        const cartItems = await CartItems.findAll({
            where: {
                userId: req.user.id
            }
        })

        res.send(cartItems)
    } catch (error) {
        next(error)
    }
})

module.exports = router