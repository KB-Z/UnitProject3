const express = require('express');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const session = require('express-session');
require('dotenv').config();

app.use(express.static('public'));
app.use(express.json());
// app.use(session({
//   secret:'unit3projectwootwoot',
//   resave:false,
//   saveUninitialized:false
// }))

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
}, () => {
	console.log('connected to mongoose');
});

db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('error', (error) => console.log(error.message));
db.on('disconnected', () => console.log('mongo disconnected'));

app.listen(PORT, () => console.log('Listening...'));
