const router = require('express').Router()
const { Sunglasses, Reviews } = require('../db/models')

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
        }
        else {
            res.json(sunglasses) 
        }
    }
    catch (error) {
        next(error)
    }
})

module.exports = router