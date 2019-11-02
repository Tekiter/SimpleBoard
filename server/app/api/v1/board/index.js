const { check, body, param, query } = require('express-validator')
const { validateParams, databaseErrorMessage } = require.main.require('./app/util/api')
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
        body('name').isString()
    ], function (req, res) {
        if (!validateParams(req, res)) {
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
        param('board_id').isNumeric(),
        validateParams
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
            .select('_id title writer likes_count comments_count')
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
        adminRequired,
        param('board_id').isNumeric(),
        body('title').isString(),
        body('content').isString(),
        validateParams
    ], function (req, res) {
        
        const boardId = parseInt(req.params.board_id)

        // Board.findOne({_id: boardId})
        Board.findOne()
        .where('_id').equals(boardId)
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


    router.patch('/board/:board_id', [
        adminRequired,
        param('board_id').isNumeric(),
        body('name').isString(),
        validateParams
    ], function (req, res) {
        Board.findById(req.params.board_id)
        .then((board) => {
            if (board) {
                board.name = req.body.name
                board.save()
                .then(() => {
                    res.status(200).json({message: "board info edited", target: board})
                })
                .catch(databaseErrorMessage(res))
            }
            else {
                res.status(404).json({message: "no board id " + req.params.board_id})
            }
        })
        .catch(databaseErrorMessage(res))
    })


    router.delete('/board/:board_id', [
        adminRequired,
        param('board_id').isNumeric(),
        validateParams
    ], function (req, res) {
        Board.findById(req.params.board_id)
        .then((board) => {
            if (board) {
                board.remove()
                .then(() => {
                    res.status(200).json({message: "board deleted", target: board})
                })
                .error(databaseErrorMessage(res))
            }
            else {
                res.status(404).json({message: "no board id " + req.params.board_id})
            }
        })
        .catch(databaseErrorMessage(res))
    })


    router.get('/post/:post_id', [
        param('post_id').isNumeric(),
        validateParams
    ], function (req, res) {
        Post.findOne()
        .where('_id').equals(req.params.post_id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            }
            else {
                res.status(404).json({message: "no post id " + req.params.post_id})
            }
        })
    })


    router.patch('/post/:post_id', [
        loginRequired,
        param('post_id').isNumeric(),
        param('title').isString(),
        param('content').isString(),
        validateParams
    ], function (req, res) {
        Post.findById(req.params.post_id)
        .then((post) => {
            if (post) {
                if (post.writer === req.user.username || req.user.isAdmin) {
                    if (req.body.title) {
                        post.title = req.body.title
                    }
                    if (req.body.content) {
                        post.content = req.body.content
                    }
                    post.save()
                    .then(() => {
                        res.status(200).json({message: "post edited", target: post})
                    })
                    .catch(databaseErrorMessage(res))
                }
                else {
                    res.status(403).json({message: "you have no permission to edit this post"})
                }
            }
            else {
                res.status(404).json({message: "no post id " + req.params.post_id})
            }
        })
        .catch(databaseErrorMessage(res))
    })

    
    router.delete('/post/:post_id', [
        loginRequired,
        param('post_id').isNumeric(),
        validateParams
    ], function (req, res) {
        Post.findById(req.params.post_id)
        .then((post) => {
            if (post) {
                if (post.writer === req.user.username || req.user.isAdmin) {
                    post.delete()
                    .then(() => {
                        res.status(200).json({message: "post deleted", target: post})

                    })
                    .catch(databaseErrorMessage(res))
                }
                else {
                    res.status(403).json({message: "you have no permission to remove this post"})
                }
            }
            else {
                res.status(404).json({message: "no post id " + req.params.post_id})
            }
        })
        .catch(databaseErrorMessage(res))
    })


    router.post('/post/:post_id/comment', [
        loginRequired,
        param('post_id').isNumeric(),
        body('content').isString(),
        validateParams
    ], function (req, res) {
        Post.findOne()
        .where('_id').equals(req.params.post_id)
        .then((post) => {
            if (!post) {
                res.status(404).json({message:"no post id " + req.params.post_id})
                return
            }

            post.addComment(req.body.content, req.user.username)
            .then(() => {
                res.status(201).json({message:"comment created"})
            })
            .catch(databaseErrorMessage(res))
        })
        .catch(databaseErrorMessage(res))
    })


    router.delete('/post/:post_id/comment/:comment_id', [
        loginRequired,
        param('post_id').isNumeric(),
        param('comment_id').isNumeric(),
        validateParams
    ], function (req, res) {
        Post.findOne()
        .where('_id').equals(req.params.post_id)
        .then((post) => {
            if (!post) {
                res.status(404).json({message:"no post id " + req.params.post_id})
                return
            }

            post.removeComment(req.params.comment_id)
            .then(() => {
                res.status(200).json({message:"comment removed"})
            })
            .catch(databaseErrorMessage(res))
        })
        .catch(databaseErrorMessage(res))
    })
}