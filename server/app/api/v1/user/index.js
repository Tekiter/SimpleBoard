const User = require.main.require('./app/model/user')
const { check, body, param, query } = require('express-validator')
const { validateParams } = require.main.require('./app/util/api')
const { loginRequired, adminRequired } = require.main.require('./app/util/session')

module.exports = function (router) {

    router.post('/user', [
        body('username').isLength({ min: 4 }),
        body('password').isLength({ min: 6 }),
        body('email').isEmail(),
        validateParams
    ], function (req, res) {
        args = req.body
        
        let user = new User({
            username: args.username,
            email: args.email,
            password: args.password
        })

        user.save()      
        

        res.send("1234")
    })

    router.get('/user', adminRequired, function (req, res) {
        res.send("authed")
    })
}
