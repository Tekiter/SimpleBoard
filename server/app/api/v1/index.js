const express = require('express');
const router = express.Router();

require('./login')(router)
require('./user')(router)
require('./board')(router)


module.exports = router