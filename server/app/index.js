const express = require('express')
const mongoose = require('mongoose')

const autoIncrement = require('mongoose-auto-increment')
const cors = require('cors')


require('dotenv').config()

const app = express()


// MongoDB 설정
const db = mongoose.connection
db.on('error', console.error)
db.once('open', function () {
    console.log("Successfully connected to Mongo")
})

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

autoIncrement.initialize(mongoose.connection)

app.use(cors())

app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// 기본 라우팅 설정
app.use('/', require('./router'))

// API 등록
app.use('/api/v1', require('./api/v1'))

// 404 페이지 처리
app.use(function (req, res, next) {
    res.status(404).send("404 ERROR")
})



module.exports = app