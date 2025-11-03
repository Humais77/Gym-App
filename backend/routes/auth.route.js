const express = require('express');
const route = express.Router();
const {signup} = require('../controller/auth.controller.js');

route.post('/signup',signup);

module.exports = route;
