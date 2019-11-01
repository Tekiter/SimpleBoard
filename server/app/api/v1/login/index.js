const { check, body, param, query } = require('express-validator')
const { validateParams } = require.main.require('./app/util/api')
const session = require.main.require('./app/util/session')
const User = require.main.require('./app/model/user')

module.exports = function (router) {

    router.post('/login', [
        body('username').exists(),
        body('password').exists(),
        validateParams
    ],
     function (req, res) {
        args = req.body
        User.findOne({username: args.username})
        .then((user) => {
            if (user && user.checkPassword(args.password)) {

            const token = session.createToken(user)

            res.json({ message: 'login success', access_token: token })
            return
            }
            
            
            res.status(401).json({ message: 'login failed' })
            
            
        })
        .catch((error) => {
            res.status(503).json({ message: 'cannot connect to db' })
        })
    })
}
