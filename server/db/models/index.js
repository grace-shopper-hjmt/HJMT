const User = require('./user')
const Sunglasses = require('./products')
const Reviews = require('./reviews')
const OrderItem = require('./orders')
const Categories = require('./categories')
const CartItems = require('./cart-items')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.belongsToMany(OrderItem)
OrderItem.belongsTo(User)
User.belongsToMany(Reviews)
Reviews.belongsTo(User)
Sunglasses.belongsToMany(Reviews)
Reviews.belongsTo(Sunglasses)
Categories.belongsToMany(Sunglasses, {through: 'SunglassesCategories'})
Sunglasses.belongsToMany(Categories, {through: 'SunglassesCategories'})
User.hasMany(CartItems)
CartItems.belongsTo(User)
Sunglasses.belongsToMany(CartItems)
CartItems.belongsTo(Sunglasses)
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Sunglasses, OrderItem, Reviews, CartItems, Categories
}
