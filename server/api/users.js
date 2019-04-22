
const { isAdmin, isAdminOrIsUser } =require('./auth-middleware')
const router = require('express').Router()
const { User, Reviews, OrderItem } = require('../db/models')

module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though users' passwords are encrypted, it won't help if we just send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isAdminOrIsUser,  async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id,{
      include: [{ model:Reviews}, {model:OrderItem}]
    })

    if (!user) {
      const error = new Error('This user does not exist!')
      error.status = 404
      next(error)
    } else {
      res.json(user)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      const err = new Error('That user does not exist!')
      err.status = 404
      return next(err)
    }
    const newUser = await User.update({...req.body})
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
