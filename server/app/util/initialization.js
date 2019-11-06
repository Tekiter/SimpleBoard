const User = require('../model/user')


module.exports = function() {
    const userCount = User.estimatedDocumentCount()
    userCount.then((count) => {
        if (count === 0) {
        console.log("Creating default admin account...")

        let user = new User({
            username: "admin",
            password: "admin",
            email: "admin@webmaster.com",
            nickname: "admin"
        })

        user.save()
        .then(() => {
            console.log("Admin account created (admin/admin)")
        })
        .catch((err) => {
            console.error(err)
            console.error("Initialize failed.")
        })
    }
    })
    // if (userCount === 0) {
    //     console.log("Creating default admin account...")

    //     let user = new User({
    //         username: "admin",
    //         password: "admin",
    //         email: "admin@webmaster.com",
    //         nickname: "admin"
    //     })

    //     user.save()
    //     .then(() => {
    //         console("Admin account created (admin/admin)")
    //     })
    //     .catch((err) => {
    //         console.error(err)
    //         console.error("Initialize failed.")
    //     })
    // }
}
