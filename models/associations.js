

const User  = require('./users')
const  Product  = require('./products')
const ProdXUser = require('./prodXusers')

User.belongsToMany(Product, {as: 'Products', foreignKey: 'product_id', through : ProdXUser})
Product.belongsToMany(User, {as: 'Users', foreignKey: 'user_id', through : ProdXUser})

module.exports = {
    User,
    Product,
    ProdXUser
}

