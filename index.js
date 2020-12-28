const express = require("express")
const mongoose = require("mongoose")
const ejs = require("ejs")

mongoose.connect("mongodb://localhost/blogdb", { useNewUrlParser: true })

const app = new express()
app.set("view engine", "ejs")
app.use(express.static("public"))

app.listen(4000, ()=>{
    console.log("App listening on port 4000")
})

app.get("/", (req, res) => {
    res.render("index")
})
app.get("/about", (req, res) => {
    res.render("about")
})
app.get("/post", (req, res) => {
    res.render("post")
})
app.get("/contact", (req, res) => {
    res.render("contact")
})