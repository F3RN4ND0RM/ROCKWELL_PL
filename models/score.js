const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');
const User = require('./users');

const Score = sequelize.define('score',{

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },

    points : {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    date_: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    user_id : {
        type: DataTypes.INTEGER,
        allowNull: true,
        references :{
            model: User,
            key: 'id'
        }
    },

    path_ : {
        type: DataTypes.STRING,
        allowNull: true,
    }
    }, 
    {timestamps: false,
        freezeTableName : true,}
);

module.exports = Score;
