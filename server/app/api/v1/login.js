

module.exports = function (router) {

    router.post('/login', function (req, res) {
        res.send('LOGGING IN!')
    })

    router.delete('/login', function (req, res) {
        res.send('LOGGING OUT!')
    })
}
