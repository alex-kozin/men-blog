module.exports = async (req, res) => {
    await res.session.destroy()
    res.redirect("/")
}