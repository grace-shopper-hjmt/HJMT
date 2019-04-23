const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/sunglasses', require('./sunglasses'))
router.use('/categories', require('./categories'))
router.use('/cart', require('./cart'))
router.use('/orders', require('./orders'))
router.use('/stripe', require('./stripe'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
