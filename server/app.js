express = require('express')


const app = express()
const port = 5000


app.use(express.json())
// app.use(express.urlencoded({ extended: true }))



app.get('/', function (req, res) {
    res.send("Hello, world!")
})

app.use(function (req, res, next) {
    res.status(404).send("404 ERROR")
})

app.listen(port, () => {
    console.log("SimpleBoard server is working on port " + port)
})
