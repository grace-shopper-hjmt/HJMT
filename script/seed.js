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
    Orders.create({quantity:1, price:500, timestamp:Date.now(), status:'Created', userId: 1})
  ])
  const reviews = await Promise.all([
    Reviews.create({content:'this is ok!', rating:3, timestamp:Date.now(), userId: 1})
  ])
  const sunglasses = await Promise.all([
    Sunglasses.create({ name:'block',price:500,inventory:10, brand:"Rayban", color:"black", shape:"round"})
  ])

  //const [order, glasses] = await Promise.all(orders, sunglasses) 
  await orders[0].addSunglasses('1')
  await reviews[0].setSunglass('1')
  
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
