const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');


const User = sequelize.define('users',{


    id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    
    first_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    last_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },


    password_ : {
        type: DataTypes.STRING,
        allowNull: false,
    },

    company:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    grades:{
        type: DataTypes.NUMBER
    },

    max_score:{
        type: DataTypes.NUMBER,
    },


    language_:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    gender : {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    rol : {
        type: DataTypes.BOOLEAN
    },

    status : {
        type: DataTypes.BOOLEAN
    },

    date_creation:{
        type: DataTypes.DATE
    },

    
},{
    timestamps: false,
    freezeTableName : true,
})

module.exports = User;