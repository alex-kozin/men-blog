const path = require("path")
const User = require("../models/User")

module.exports = async (req, res) => {
    User.create(req.body, (error, user) => {
        if (error)
            res.redirect("/auth/register")
        else
            res.redirect("/")
    })
}