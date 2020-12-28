const express = require("express")
const mongoose = require("mongoose")
const expressSession = require("express-session")
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
const logoutController = require("./controllers/logout")

const validationMiddleware = require("./middleware/validationMiddleware")
const authMiddleware = require("./middleware/authMiddleware")
const redirectIfAuth = require("./middleware/redirectIfAuthenticatedMiddleware")

mongoose.connect("mongodb://localhost/blogdb", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const app = new express()

app.use(expressSession({
    secret: "not very secret"
}))

global.loggedIn = null
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})

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
app.get("/posts/new", authMiddleware, newPostController)

app.use("/posts/store", validationMiddleware)
app.post("/posts/store", authMiddleware, storePostController)

app.get("/auth/register", redirectIfAuth, newUserController)
app.post("/users/register", redirectIfAuth, storeUserController)

app.get("/auth/login", redirectIfAuth, loginController)
app.post("/users/login", redirectIfAuth, loginUserController)

app.get("/auth/logout", authMiddleware, logoutController)

app.use((req, res) => res.render("notfound"))