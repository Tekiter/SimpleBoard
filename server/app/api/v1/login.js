const user = require.main.require('./app/model/user')

exports.login = function (req, res) {
    res.send('LOGGING IN!')
}