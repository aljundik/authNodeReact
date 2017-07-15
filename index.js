//starting point of the app
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
//db setup

mongoose.connect('mongodb://localhost:27017/authin');

//App setup
app.use(morgan('combined'));// morgan is a log request 
app.use(bodyParser.json({type: '*/*'}));
router(app);





//Server Setup

const port = process.env.PORT || 3090;
const server = http.createServer(app);// create http server to recive requestss
server.listen(port);

console.log('Server listening on:', port)


