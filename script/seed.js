/* eslint-disable max-statements */
'use strict'

const db = require('../server/db')
const {
  User,
  OrderItem,
  Reviews,
  Sunglasses,
  CartItems,
  Categories
} = require('../server/db/models')
const faker = require('faker')

const generateSunglasses = () => {
  let sunglasses = []
  for (let i = 0; i < 1000; i++) {
    sunglasses.push({
      name: faker.lorem.word(),
      price: faker.commerce.price() * 100,
      inventory: Math.floor(Math.random() * 100)
    })
  }
  return sunglasses
}
const generateReviews = () => {
  let reviews = []
  for (let i = 0; i < 500; i++) {
    reviews.push({
      content: faker.lorem.sentences(),
      timestamp: faker.date.recent(100),
      rating: Math.floor(Math.random() * 6)
    })
  }
  return reviews
}

const generateUsers = () => {
  let users = [
    {name: 'cody', email: 'cody@email.com', password: '123', isAdmin: true}
  ]
  for (let i = 0; i < 250; i++) {
    users.push({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: '123',
      billingAddress: faker.address.streetAddress()
    })
  }
  return users
}
async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await User.bulkCreate(generateUsers(), {
    returning: true
  })

  const reviews = await Reviews.bulkCreate(generateReviews(), {
    returning: true
  })
  const sunglasses = await Sunglasses.bulkCreate(generateSunglasses(), {
    returning: true
  })

  const orderItem = await Promise.all([
    OrderItem.create({
      name: 'Clubmaster',
      description: null,
      imageUrl:
        'https://www.freepngimg.com/thumb/sunglasses/8-2-sunglasses-png-image.png',
      quantity: 1,
      price: 500,
      timestamp: Date.now(),
      status: 'Created',
      userId: 1,
      sunglassId: 1
    }),
    OrderItem.create({
      name: 'Stingray',
      description: null,
      imageUrl:
        'https://www.freepngimg.com/thumb/sunglasses/8-2-sunglasses-png-image.png',
      quantity: 3,
      price: 3000,
      timestamp: Date.now(),
      status: 'Processing',
      userId: 2,
      sunglassId: 2
    }),
    OrderItem.create({
      name: 'Aviator',
      description: null,
      imageUrl:
        'https://www.freepngimg.com/thumb/sunglasses/8-2-sunglasses-png-image.png',
      quantity: 2,
      price: 2000,
      timestamp: Date.now(),
      status: 'Completed',
      userId: 2,
      sunglassId: 3
    }),
    OrderItem.create({
      name: 'Wayfarer',
      description: null,
      imageUrl:
        'https://www.freepngimg.com/thumb/sunglasses/8-2-sunglasses-png-image.png',
      quantity: 3,
      price: 1500,
      timestamp: Date.now(),
      status: 'Cancelled',
      userId: 1,
      sunglassId: 4
    }),
    OrderItem.create({
      name: 'Clubmaster',
      description: null,
      imageUrl:
        'https://www.freepngimg.com/thumb/sunglasses/8-2-sunglasses-png-image.png',
      quantity: 1,
      price: 1000,
      timestamp: Date.now(),
      status: 'Created',
      userId: 2,
      sunglassId: 1
    })
  ])

  const cartItems = await Promise.all([
    CartItems.create({quantity: 10, userId: 1}),
    CartItems.create({quantity: 9, userId: 1}),
    CartItems.create({quantity: 8, userId: 2}),
    CartItems.create({quantity: 7, userId: 2})
  ])

  const categories = await Promise.all([
    Categories.create({name: 'Ray-Ban', type: 'Brand'}),
    Categories.create({name: 'Persol', type: 'Brand'}),
    Categories.create({name: 'Maui Jim', type: 'Brand'}),
    Categories.create({name: 'Moscot', type: 'Brand'}),
    Categories.create({name: 'Brown', type: 'Color'}),
    Categories.create({name: 'Black', type: 'Color'}),
    Categories.create({name: 'Purple', type: 'Color'}),
    Categories.create({name: 'Blue', type: 'Color'}),
    Categories.create({name: 'Red', type: 'Color'}),
    Categories.create({name: 'Square', type: 'Shape'}),
    Categories.create({name: 'Round', type: 'Shape'}),
    Categories.create({name: '$0-$50', type: 'Price'}),
    Categories.create({name: '$51-$100', type: 'Price'}),
    Categories.create({name: '$101+', type: 'Price'})
  ])
  await cartItems[0].setSunglass('1')
  await cartItems[1].setSunglass('2')
  await cartItems[2].setSunglass('3')
  await cartItems[3].setSunglass('4')

  let brands = await Categories.findAll({
    where: {
      type: 'Brand'
    },
    raw: true
  })

  let colors = await Categories.findAll({
    where: {
      type: 'Color'
    },
    raw: true
  })

  let shape = await Categories.findAll({
    where: {
      type: 'Shape'
    },
    raw: true
  })

  let price = await Categories.findAll({
    where: {
      type: 'Price'
    },
    raw: true
  })

  for (let i = 0; i < sunglasses.length; i++) {
    let randomIdx = Math.floor(Math.random() * brands.length)
    await sunglasses[i].addCategories(brands[randomIdx].id)
    let fifty = price.filter(price => price.name === "$0-$50")
    let hundred = price.filter(price => price.name === "$51-$100")
    let hundredPlus = price.filter(price => price.name === "$101+")
    if (sunglasses[i].price / 100 < 50) {
      await sunglasses[i].addCategories(fifty[0].id)
    } else if (sunglasses[i].price / 100 < 100) {
      await sunglasses[i].addCategories(hundred[0].id)
    } else
      await sunglasses[i].addCategories(hundredPlus[0].id)
  }

  for (let i = 0; i < sunglasses.length; i++) {
    let randomIdx = Math.floor(Math.random() * colors.length)
    await sunglasses[i].addCategories(colors[randomIdx].id)
  }

  for (let i = 0; i < sunglasses.length; i++) {
    let randomIdx = Math.floor(Math.random() * shape.length)
    await sunglasses[i].addCategories(shape[randomIdx].id)
  }

  for (let i = 0; i < reviews.length; i++) {
    let randomIdx = Math.floor(Math.random() * reviews.length)
    let randomIdx1 = Math.floor(Math.random() * users.length)
    await reviews[i].setSunglass(sunglasses[randomIdx].id)
    await reviews[i].setUser(users[randomIdx1].id)
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${orderItem.length} orderItem`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded ${sunglasses.length} sunglasses`)
  console.log(`seeded ${cartItems.length} cartItems`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
