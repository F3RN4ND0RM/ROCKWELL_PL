

const User  = require('./users')
const  Product  = require('./products')
const ProdXUser = require('./prodXusers')
const Score = require('./score')

User.belongsToMany(Product, {as: 'Products', foreignKey: 'product_id', through : ProdXUser})
Product.belongsToMany(User, {as: 'Users', foreignKey: 'user_id', through : ProdXUser})

User.hasMany(Score, { foreignKey: 'user_id' });
Score.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
    User,
    Product,
    ProdXUser,
    Score,
}

