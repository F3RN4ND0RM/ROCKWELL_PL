
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('../db/connection')
const productsRoutes = require('../routes/product.routes')
const usersRoutes = require('../routes/user.routes')

class Server {

    app ;

    constructor() {

        

        this.app = express();
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();

        // DB connection
        this.dbConnection();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            console.error(error);
        }
    }

    middlewares() {
        this.app.use(cors({
            origin: 'http://localhost:4000',
            credentials: true
          }));
        this.app.use(express.json());
        this.app.use(cookieParser());
    }

    routes() {
        this.app.use("/api", productsRoutes, usersRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    }
}

module.exports = Server;
