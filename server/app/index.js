const express = require('express')


const app = express()



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