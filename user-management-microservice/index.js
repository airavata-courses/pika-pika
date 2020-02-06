const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
var url = "mongodb://localhost:27017/pika-pika";


mongoose.connect(url);
//attach lister to connected event
mongoose.connection.once('connected', function () {
	console.log("Connected to database")
});

const app = express();

//Middleware setup

app.use(morgan('dev'));
app.use(bodyParser.json());

//Routes

app.use('/api/users', require('./routes/users'))
//Start the server

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Server is running on ${PORT}`);
