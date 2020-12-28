const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const mongoose = require("mongoose")
const ejs = require("ejs")
const BlogPost = require("./models/BlogPost")

mongoose.connect("mongodb://localhost/blogdb", { useNewUrlParser: true })

const app = new express()
app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(express.static("public"))

app.listen(4000, ()=>{
    console.log("App listening on port 4000")
})

app.get("/", async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render("index", {
        blogposts
    })
})
app.get("/about", (req, res) => {
    res.render("about")
})
app.get("/post/:id", async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render("post", {
        blogpost
    })
})
app.get("/contact", (req, res) => {
    res.render("contact")
})
app.get("/posts/new", (req, res) => {
    res.render("create")
})

const validationMiddleware = (req, res, next) => {
    if (req.files == null || req.body.title == null)
        return res.redirect('/posts/new')
    next()
}
app.use("/posts/store", validationMiddleware)

app.post("/posts/store", (req, res) => {
    let image = req.files.image
    image.mv(path.resolve(__dirname, "public/img", image.name), async error => {
        await BlogPost.create({
            ...req.body,
            image: `/img/${image.name}`
        })
        res.redirect("/")
    })
})