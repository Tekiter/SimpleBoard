const { check, validationResult } = require('express-validator');


module.exports.check = check

module.exports.validateParams = function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return false
    }
    else {
        if (next) {
            next()
        }
        return true
    }
    
}

module.exports.databaseErrorMessage = function (res) {
    return function (err) {
        res.status(503).json({ message: "database error" })
    }
}