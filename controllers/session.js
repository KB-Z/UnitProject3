const express = require('express');
const router = express.Router();
const session = require('express-session');

const User = require('../models/users.js');

router.post('/', (req, res) => {
res.send('in session');
})
module.exports = router;
