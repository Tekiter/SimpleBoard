const { check, validationResult } = require('express-validator');


module.exports.validateJson = function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return false
    }
    else {
        return true
    }
    
}