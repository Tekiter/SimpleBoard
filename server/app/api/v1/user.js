const userModel = require.main.require('./app/model/user')



exports.register = function (req, res) {
    res.json(res.body.username)
}