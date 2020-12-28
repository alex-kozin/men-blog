bcrypt = require("bcrypt")

const User = require("../models/User")

module.exports = (req, res) => {
    const { username, password } = req.body

    User.findOne({ username }, async (error, user) => {
        if (!user) return res.redirect("/auth/login")

        same = await bcrypt.compare(password, user.password)
        if (!same) return res.redirect("/auth/login")

        res.redirect("/")
    })
}