const { Sequelize } = require('sequelize');

const  db = new Sequelize(process.env.DBURL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
})

module.exports = db
