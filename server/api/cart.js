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

router.post('/add/:sunglassesId', async (req, res, next) => {
    // console.log('USERID IS: ', req.user.id)
    try {
        let cartItem = await CartItems.findOne({
            where: {
                userId: '3',
                sunglassId: req.params.sunglassesId
            }
        })


        if (cartItem) {
            await cartItem.quantity++
        } else {
           cartItem = await CartItems.create({
                userId: '3',
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