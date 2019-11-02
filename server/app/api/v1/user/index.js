const User = require.main.require('./app/model/user')
const { check, body, param, query } = require('express-validator')
const { validateParams, databaseErrorMessage } = require.main.require('./app/util/api')
const { loginRequired, adminRequired } = require.main.require('./app/util/session')

module.exports = function (router) {

    router.post('/user', [
        body('username').isLength({ min: 4 }),
        body('password').isLength({ min: 6 }),
        body('email').isEmail(),
        validateParams
    ], function (req, res) {
        args = req.body


        User.findOne()
        .where('username').equals(args.username)
        .then((euser) => {

            if (euser) {
                res.status(400).json({
                    errors: [
                        {
                            msg: "Duplicated username",
                            param: "username",
                            location: "body"
                        }
                    ]
                })
                return
            }

            let user = new User({
                username: args.username,
                email: args.email,
                password: args.password
            })
    
            user.save()
            .then(() => {
                res.send({ message: "registered" })
            })
            .catch(databaseErrorMessage(res))

        })
        .catch(databaseErrorMessage(res))

        
        

        
    })

    router.get('/user', adminRequired, function (req, res) {
        res.send("authed")
    })
}
