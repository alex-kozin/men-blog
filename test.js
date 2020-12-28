const mongoose = require("mongoose")

const BlogPost = require("./models/BlogPost")

mongoose.connect("mongodb://localhost/blogdb", { useNewUrlParser: true })
mongoose.set('useFindAndModify', false);

BlogPost.create({
    title: "Test Blog Post",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
}, (error, blogpost) => {
    console.log(error, blogpost)
})

BlogPost.create({
    title: "Test Blog Post 2",
    body: "Short body"
}, (error, blogpost) => {
    console.log(error, blogpost)
})

BlogPost.find({
    title: "Test Blog Post"
}, (error, blogpost) => {
    console.log(error, blogpost)
})

BlogPost.find({
    title: "/Test/"
}, (error, blogpost) => {
    console.log(error, blogpost)
})

// var id = "5fe94351af6e5c41101ae1ab"

// BlogPost.findByIdAndUpdate(id, {
//     title: "Brand new new title"
// }, (error, blogpost) => {
//         console.log(error, blogpost)
// })

// BlogPost.findByIdAndDelete(id, (error, blogpost) => {
//         console.log(error, blogpost)
// })