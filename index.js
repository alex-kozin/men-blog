const express = require("express")
const mongoose = require("mongoose")
const ejs = require("ejs")

const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

const homeController = require("./controllers/home")
const contactController = require("./controllers/contact")
const aboutController = require('./controllers/about')
const newPostController = require("./controllers/newPost")
const getPostController = require("./controllers/getPost")
const storePostController = require("./controllers/storePost")
const newUserController = require("./controllers/newUser")
const storeUserController = require("./controllers/storeUser")
const loginController = require("./controllers/login")
const loginUserController = require("./controllers/loginUser")

const validationMiddleware = require("./middleware/validationMiddleware")

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

app.get("/", homeController)
app.get("/about", aboutController)
app.get("/post/:id", getPostController)
app.get("/contact", contactController)
app.get("/posts/new", newPostController)

app.use("/posts/store", validationMiddleware)
app.post("/posts/store", storePostController)

app.get("/auth/register", newUserController)
app.post("/users/register", storeUserController)
app.get("/auth/login", loginController)
app.post("/users/login", loginUserController)

