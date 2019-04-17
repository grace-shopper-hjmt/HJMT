'use strict'

const db = require('../server/db')
const { User, Orders, Reviews, Sunglasses } = require('../server/db/models')


async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name:"cody",email: 'cody@email.com', password: '123'}),
    User.create({name:"murphy", email: 'murphy@email.com', password: '123'})
  ])

  const orders = await Promise.all([
    Orders.create({quantity:1, price:500, timestamp:Date.now(), status:'Created', userId: 1}),
    Orders.create({quantity:3, price:3000, timestamp:Date.now(), status:'Processing', userId: 2}),
    Orders.create({quantity:2, price:2000, timestamp:Date.now(), status:'Completed', userId: 2}),
    Orders.create({quantity:3, price:1500, timestamp:Date.now(), status:'Cancelled', userId: 1}),
    Orders.create({quantity:1, price:1000, timestamp:Date.now(), status:'Created', userId: 2}),
  ])
  const reviews = await Promise.all([
    Reviews.create({content:'this is meh!', rating:2, timestamp:Date.now(), userId: 1}),
    Reviews.create({content:'this is ok!', rating:3, timestamp:Date.now(), userId: 2}),
    Reviews.create({content:'this is great!', rating:4, timestamp:Date.now(), userId: 2}),
    Reviews.create({content:'this is amazing!!', rating:5, timestamp:Date.now(), userId: 1})
  ])
  const sunglasses = await Promise.all([
    Sunglasses.create({ name:'stingray',price:500,inventory:5, brand:"Maui Jim", color:"black", shape:"square"}),
    Sunglasses.create({ name:'aviator',price:500,inventory:15, brand:"Ray-Ban", color:"brown", shape:"round"}),
    Sunglasses.create({ name:'wayfarer',price:500,inventory:7, brand:"Ray-Ban", color:"black", shape:"round"}),
    Sunglasses.create({ name:'clubmaster',price:500,inventory:3, brand:"Ray-Ban", color:"brown", shape:"square"}),
  ])

  await orders[0].addSunglasses('1')
  await orders[1].addSunglasses('2')
  await orders[1].addSunglasses('3')
  await orders[1].addSunglasses('4')
  await orders[2].addSunglasses('1')
  await orders[2].addSunglasses('3')
  await orders[3].addSunglasses('3')
  await orders[3].addSunglasses('2')
  await orders[3].addSunglasses('1')
  await orders[4].addSunglasses('2')

  await reviews[0].setSunglass('1')
  await reviews[1].setSunglass('2')
  await reviews[2].setSunglass('3')
  await reviews[3].setSunglass('4')

  
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded ${sunglasses.length} sunglasses`)



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
