
const { check, validateJson } = require.main.require('./app/util/api')
const { adminRequired } = require.main.require('./app/util/session')
const session = require.main.require('./app/util/session')
const User = require.main.require('./app/model/user')
const Board = require.main.require('./app/model/board')
const Post = require.main.require('./app/model/post')


module.exports = function (router) {

    router.get('/board', [
        
    ], function (req, res) {
        Board.find().select('name permissions _id')
        .then((boards) => {
            res.json({
                boards: boards
            })
        })
        .catch((err) => {
            res.status(503).json({})
        })
    })

    router.post('/board', [
        adminRequired,
        check('name').isString()
    ], function (req, res) {
        const board = new Board({
            name: req.body.name,
            owner: req.user.username
        })
        board.save()
        .then((saved) => {
            res.status(201).json({saved})
        })
        .catch((err) => {
            res.status(503).json({ message: "database error" })
        })
    })

    router.post('/board/:id', [

    ])
}