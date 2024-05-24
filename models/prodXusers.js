const {  DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const Product = require('./products');
const User = require('./users');

const  ProdXUsers = sequelize.define('prod_users',{

    product_id : {
        type : DataTypes.NUMBER,
        allowNull: false,
        references :{
            model: Product,
            key: 'id'
        }
    },

    user_id : {
        type : DataTypes.NUMBER,
        allowNull: false,
        references :{
            model: User,
            key: 'id'
        }
    },
    date_ : {
        type : DataTypes.DATE,        
    }

},{
    timestamps: false,
    freezeTableName : true,
})

module.exports = ProdXUsers;