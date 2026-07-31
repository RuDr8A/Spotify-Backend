const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('../src/routes/auth.route')
const musicRouter = require('../src/routes/music.route')
const app = express() ;
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter);
app.use('/api/music', musicRouter);

module.exports = app ;