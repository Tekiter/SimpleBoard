const jwt = require('jsonwebtoken')

const admin_permission = 100

const session = {
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
                session.checkToken(splittoken[1])
                .then(function (decoded) {
                    req.user = decoded
                    req.user.isAdmin = (req.user.permission_level >= admin_permission)
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

        session.loginRequired(req, res, function() {
            if (req.user.permission_level < admin_permission) {
                res.status(403).json({"message": "admin permission required"})
            }
            else {
                next()
            }
        })
    }
}


module.exports = session