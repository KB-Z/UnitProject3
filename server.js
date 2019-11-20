const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const session = require('express-session');
require('dotenv').config();

const PORT = process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI;


//controller routes
const usersController = require('./controllers/users.js');
app.use('/users', usersController);

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));

app.listen(PORT, () => console.log('Listening...'));
