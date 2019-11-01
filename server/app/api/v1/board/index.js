
const { check, validateJson, databaseErrorMessage } = require.main.require('./app/util/api')
const { adminRequired, loginRequired } = require.main.require('./app/util/session')
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
        if (!validateJson(req, res)) {
            return
        }

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


    router.get('/board/:board_id', [
        check('board_id').isNumeric(),
        validateJson
    ], function (req, res) {
        const boardId = parseInt(req.params.board_id)

        Board.findOne({_id: boardId})
        .then((board) => {
            if (!board) {
                res.status(404).json({message:"no board id " + boardId})
                return
            }

            Post.find()
            .where('board').equals(boardId)
            .select('_id title writer')
            .then((posts) => {
                
                res.status(200).json({
                    board:board,
                    posts:posts
                })
            })
            .catch(databaseErrorMessage(res))
        })
        .catch(databaseErrorMessage(res))

    })


    router.post('/board/:board_id', [
        loginRequired,
        check('board_id').isNumeric(),
        check('title').isString(),
        check('content').isString(),
        validateJson
    ], function (req, res) {
        
        const boardId = parseInt(req.params.board_id)

        // Board.findOne({_id: boardId})
        Board.find()
        .where('_id').equals(boardId)
        .findOne()
        .then((board) => {
            
            const post = new Post({
                board: boardId,
                title: req.body.title,
                content: req.body.content,
                writer: req.user.username
            })
            
            
            post.save()
            .then((newpost) => {
                res.status(201).json(newpost)
            })
            .catch(databaseErrorMessage(res))
        })
        .catch((err) => {
            
            
            res.status(404).json({message:"no board id "+boardId})
        })
    })


    router.get('/post/:post_id', [
        check('post_id').isNumeric(),
        validateJson
    ], function (req, res) {
        Post.find()
        .where('_id').equals(req.params.post_id)
        .findOne()
        .then((post) => {
            res.status(200).json(post)
        })
    })
}