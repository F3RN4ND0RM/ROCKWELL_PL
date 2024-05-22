const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');


const Product = sequelize.define('products',{


    id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    
    name_ : {
        type: DataTypes.STRING,
        allowNull: false,
    },

    category : {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description : {
        type: DataTypes.STRING,
        allowNull: false,
    },

    image : {
        type: DataTypes.STRING,
        allowNull: false,
    },

    total_clicks :{
        type: DataTypes.INTEGER
    },

    status :{
        type: DataTypes.BOOLEAN
    },

    creator:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    date_creation:{
        type: DataTypes.DATE
    },
    
},{
    timestamps: false,
    freezeTableName : true,
})

module.exports = Product;