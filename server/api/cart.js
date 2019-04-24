//how to handle carts for logged in users and users that aren't logged in?
const router = require('express').Router()
const Sequelize = require('sequelize')
const { CartItems, Sunglasses } = require('../db/models')

router.get('/', async (req, res, next) => {
    try {
        let cartItems;
        if (!req.user) {
            if (!req.session.cart) {
                res.send('you have no items in your cart!')
            } else {
                //sends back an array of IDs corresponding to products added
                cartItems = req.session.cart
            }
        } else {
            cartItems = await CartItems.findAll({
                where: {
                    userId: req.user.id
                }, 
                
                include: {model: Sunglasses}
            })
        }
        res.json(cartItems)
    } catch (error) {
        next(error)
    }
})

router.post('/:sunglassesId', async (req, res, next) => {
    try {
        if (!req.user) {
            const sunglasses = await Sunglasses.findByPk(req.params.sunglassesId)
            if (!req.session.cart) {
                req.session.cart = [{quantity: 1, sunglasses}]
                res.send(req.session)
            } else {
                let inCart = false
                for (let i = 0; i < req.session.cart.length; i++) {
                    if (req.session.cart[i].sunglasses.id === Number(req.params.sunglassesId)) {
                        inCart = true
                        req.session.cart[i].quantity += 1
                        return res.send(req.session)
                    }  
                }

                if (!inCart) {
                    req.session.cart.push({quantity: 1, sunglasses})
                }
                return res.send(req.session)
            }
        }
        else {
            let cartItem = await CartItems.findOne({
                where: {
                    userId: req.body.userId,
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
                cartItem = await CartItems.findByPk(cartItem.id)
            } else {
               cartItem = await CartItems.create({
                    userId: req.body.userId,
                    sunglassId: req.params.sunglassesId,
                    quantity: 1
                })
            }
    
            res.send(cartItem)
        }

    } catch (error) {
        next(error)
    }

})

router.put('/', async (req, res, next) => {
    try {
        const cartItem = await CartItems.findOne({
            where: {
                userId: req.body.userId,
                sunglassId: req.body.sunglassId
            }
        })

        cartItem.update({quantity: req.body.quantity})
        res.end()
    } catch (error) {
        next(error)
    }
})

router.delete('/', async (req, res, next) => {
    try { 
        await CartItems.destroy({
            where: {
                userId: req.body.userId
            }
        })
        res.end()
    }
    catch (error) {
        next(error)
    }
})

router.delete('/:sunglassId', async (req, res, next) => {
    try {
        await CartItems.destroy({
            where: {
                userId: req.body.userId,
                sunglassId: req.params.sunglassId
            }
        })
        res.end()
    } catch (error) {
        next(error)
    }
})

module.exports = router