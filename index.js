const config = require("./config")
const express = require("express")
const mongoose = require("mongoose")
const expressSession = require("express-session")
const flash = require("connect-flash")
const ejs = require("ejs")

const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

const homeController = require("./controllers/home")
const contactController = require("./controllers/contact")
const aboutController = require('./controllers/about')
const newPostController = require("./controllers/newPost")
const getPostController = require("./controllers/getPost")
const storePostController = require("./controllers/storePost")
const registerController = require("./controllers/register")
const storeUserController = require("./controllers/storeUser")
const loginController = require("./controllers/login")
const loginUserController = require("./controllers/loginUser")
const logoutController = require("./controllers/logout")

const validationMiddleware = require("./middleware/validationMiddleware")
const authMiddleware = require("./middleware/authMiddleware")
const redirectIfAuth = require("./middleware/redirectIfAuthenticatedMiddleware")

const connection_string = config.debug ? config.local.connection_string : config.prod.connection_string
mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const app = new express()

const session_secret = config.debug ? config.local.session_secret : config.prod.connection_string
app.use(expressSession({
    secret: session_secret
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
app.use(flash())

let port = process.env.PORT ? process.env.PORT : config.local.port
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})

app.get("/", homeController)
app.get("/about", aboutController)
app.get("/post/:id", getPostController)
app.get("/contact", contactController)
app.get("/posts/new", authMiddleware, newPostController)

app.use("/posts/store", validationMiddleware)
app.post("/posts/store", authMiddleware, storePostController)

app.get("/auth/register", redirectIfAuth, registerController)
app.post("/users/register", redirectIfAuth, storeUserController)

app.get("/auth/login", redirectIfAuth, loginController)
app.post("/users/login", redirectIfAuth, loginUserController)

app.get("/auth/logout", authMiddleware, logoutController)

app.use((req, res) => res.render("notfound"))