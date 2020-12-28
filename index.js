const express = require("express")
const ejs = require("ejs")

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