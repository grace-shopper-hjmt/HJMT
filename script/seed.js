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

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name: 'cody', email: 'cody@email.com', password: '123'}),
    User.create({name: 'murphy', email: 'murphy@email.com', password: '123'})
  ])

  const reviews = await Promise.all([
    Reviews.create({
      content: 'this is meh!',
      rating: 2,
      timestamp: Date.now(),
      userId: 1
    }),
    Reviews.create({
      content: 'this is ok!',
      rating: 3,
      timestamp: Date.now(),
      userId: 2
    }),
    Reviews.create({
      content: 'this is great!',
      rating: 4,
      timestamp: Date.now(),
      userId: 2
    }),
    Reviews.create({
      content: 'this is amazing!!',
      rating: 5,
      timestamp: Date.now(),
      userId: 1
    })
  ])
  const sunglasses = await Promise.all([
    Sunglasses.create({ name:'Stingray',price:5500,inventory:5}),
    Sunglasses.create({ name:'Aviator',price:10000,inventory:15}),
    Sunglasses.create({ name:'Wayfarer',price:15000,inventory:7}),
    Sunglasses.create({ name:'Clubmaster',price:2500,inventory:3}),
  ])

  const orderItem = await Promise.all([
    OrderItem.create({
      name: 'Clubmaster',
      description: null,
      imageUrl: 'https://cdn.shopify.com/s/files/1/0148/9585/products/sunglasses-rose-theater-1_800x.jpg?v=1540248182',
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
      imageUrl: 'https://cdn.shopify.com/s/files/1/0148/9585/products/sunglasses-rose-theater-1_800x.jpg?v=1540248182',
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
      imageUrl: 'https://cdn.shopify.com/s/files/1/0148/9585/products/sunglasses-rose-theater-1_800x.jpg?v=1540248182',
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
      imageUrl: 'https://cdn.shopify.com/s/files/1/0148/9585/products/sunglasses-rose-theater-1_800x.jpg?v=1540248182',
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
      imageUrl: 'https://cdn.shopify.com/s/files/1/0148/9585/products/sunglasses-rose-theater-1_800x.jpg?v=1540248182',
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
    CartItems.create({quantity: 7, userId: 2}),
  ])

  const categories = await Promise.all([
    Categories.create({ name: 'Ray-Ban', type: 'Brand' }),
    Categories.create({ name: 'Persol', type: 'Brand' }),
    Categories.create({ name: 'Brown', type: 'Color' }),
    Categories.create({ name: 'Black', type: 'Color'}),
    Categories.create({ name: 'Red', type: 'Color'}),
    Categories.create({ name: 'Square', type: 'Shape' }),
    Categories.create({ name: 'Round', type: 'Shape' }),
   ])
  await cartItems[0].setSunglass('1')
  await cartItems[1].setSunglass('2')
  await cartItems[2].setSunglass('3')
  await cartItems[3].setSunglass('4')

  await sunglasses[0].addCategories('1')
  await sunglasses[0].addCategories('3')
  await sunglasses[0].addCategories('6')

  await sunglasses[1].addCategories('2')
  await sunglasses[1].addCategories('4')
  await sunglasses[1].addCategories('6')
  
  await sunglasses[2].addCategories('2')
  await sunglasses[2].addCategories('5')
  await sunglasses[2].addCategories('7')

  await sunglasses[3].addCategories('1')
  await sunglasses[3].addCategories('4')
  await sunglasses[3].addCategories('7')

  await reviews[0].setSunglass('1')
  await reviews[1].setSunglass('2')
  await reviews[2].setSunglass('3')
  await reviews[3].setSunglass('4')

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
