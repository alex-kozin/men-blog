module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render("create", {
            // Add necessary libraries to allow for post creation in WYSIWYG editor
            createPost: true
        })
    }
    
    res.redirect("auth/login")
}