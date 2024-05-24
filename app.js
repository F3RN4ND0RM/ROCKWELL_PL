const express = require('express')
const cors = require('cors');

const app = express()
app.use(cors())
require('dotenv').config();
const Server = require('./models/server');
const server = new Server();
server.listen()