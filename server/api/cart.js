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

        res.json(cartItems)
    } catch (error) {
        next(error)
    }
})

router.post('/add/:sunglassesId/:userId', async (req, res, next) => {
    try {
        let cartItem = await CartItems.findOne({
            where: {
                userId: req.params.userId,
                sunglassId: req.params.sunglassesId
            }
        })


        if (cartItem) {
            const newCount = cartItem.quantity + 1
            await CartItems.update({quantity: newCount}, {
                where: {
                    id: cartItem.id
                }
            })
        } else {
           cartItem = await CartItems.create({
                userId: req.params.userId,
                sunglassId: req.params.sunglassesId,
                quantity: 1
            })
        }

        res.json(cartItem)
    } catch (error) {
        next(error)
    }

})


module.exports = router