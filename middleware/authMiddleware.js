const User  = require("../models/User")

module.exports = (req, res, next) => {
    User.findById(req.session.id, (error, user) => {
        if (error || !user) return res.redirect("/")
        
        next()
    })
}