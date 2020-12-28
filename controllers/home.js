const BlogPost = require("../models/BlogPost")

module.exports = async (req, res) => {
    // Get all blogposts and "populate" (reference actual document) with userId
    const blogposts = await BlogPost.find({}).populate("userid")
    console.log(req.session)
    res.render("index", {
        blogposts
    })
}