const User = require('./user')
const Sunglasses = require('./products')
const Reviews = require('./reviews')
const Orders = require('./orders')


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(Orders)
Orders.belongsTo(User)
Sunglasses.belongsToMany(Orders,{through:'SunglassesOrders'})
Orders.belongsToMany(Sunglasses, {through: 'SunglassesOrders'})
User.hasMany(Reviews)
Reviews.belongsTo(User)
Sunglasses.hasMany(Reviews)
Reviews.belongsTo(Sunglasses)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Sunglasses, Orders, Reviews
}
