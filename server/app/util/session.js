const jwt = require('jsonwebtoken')


module.exports = {
    createToken(user) {
        let token = jwt.sign({
            username: user.username,
            permission_level: user.permission_level
        }, process.env.JWT_SECRET, { expiresIn: 86400})
        return token
    },
    checkToken(token) {
        return new Promise(function (resolve, reject) {
            jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
                if (!err) {
                    resolve(decoded)
                }
                else {
                    reject(err)
                }
            })
        })
    },
    loginRequired(req, res, next) {

        if (req.headers && req.headers.authorization) {
            let splittoken = req.headers.authorization.split(' ')
            if (splittoken[0] == 'JWT') {
                module.exports.checkToken(splittoken[1])
                .then(function (decoded) {
                    req.user = decoded
                    next()
                })
                .catch(function (err) {
                    res.status(401).json({"message": "login required"})
                })
                return
            }
        }
        res.status(401).json({"message": "login required"})
    },
    adminRequired(req, res, next) {

        module.exports.loginRequired(req, res, function() {
            if (req.user.permission_level < 100) {
                res.status(403).json({"message": "admin permission required"})
            }
            else {
                next()
            }
        })
    }
}
