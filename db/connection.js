const { Sequelize } = require('sequelize');

const  db = new Sequelize(process.env.DBURL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        useUTC: false
      }
    },
    "timezone" : '-12:00'
})

module.exports = db
