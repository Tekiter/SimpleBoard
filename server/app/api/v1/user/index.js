const User = require.main.require('./app/model/user')
const { check, validationResult } = require('express-validator');
const { validateJson } = require.main.require('./app/util/api')

module.exports = function (router) {

    router.post('/user', [
        check('username').isLength({ min: 4 }),
        check('password').isLength({ min: 6 }),
        check('email').isEmail()
    ], function (req, res) {
        if (validateJson(req, res)) {
            args = req.body
            
            
            

            let user = new User({
                username: args.username,
                
            })

            user.save()      
            

            res.send("1234")
        }
    })
}
