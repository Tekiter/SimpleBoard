const userModel = require.main.require('./app/model/user')

module.exports = function (router) {

    router.post('/user', function (req, res) {
    
        args = req.body
    
        if (args.username && args.password && args.nickname && args.email) {
    
        }
        else {
            res.status(400).send({"message": ""})
        }
    
        
    })
}
