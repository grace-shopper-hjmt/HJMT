const router = require('express').Router()
const stripe = require('stripe')('sk_test_PjwrVgSEhIaKOaWarN1TeybR00TJkMnxzZ')


router.post('/charge', async (req, res, next) => {
    try {
      console.log(req.body)
        let charge = await stripe.charges.create({
          amount: req.body.cost,
          currency: "usd",
          description: "lorem ipsum oubflgwbueG",
          source: req.body.token.id
        })

        res.json(charge)
      } catch (err) {
        res.status(500).end();
      }
})

module.exports = router