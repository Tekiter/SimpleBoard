
const app = require('./app')

const port = 5000

app.listen(port, () => {
    console.log("SimpleBoard server is working on port " + port)
})