const express = require("express"),
bodyParser = require("body-parser"),
mongoose = require("mongoose"),
app = express();

const port = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);




/* Blog.create({
    title: "Test Blog",
    image: "https://images.unsplash.com/photo-1560121160-d0d230141128?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500&h=500&fit=crop&ixid=eyJhcHBfaWQiOjF9",
    body: "Test blog post"
}); */




// Restful routes

app.get("/", (req, res) => {
    res.redirect("/blogs");
})

// Index route
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// New route
app.get("/blogs/new", (req, res) => {
    res.render("new");
})

// Create route
app.post("/blogs", (req, res) => {
    // create blog
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    })
});


// Show route
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

// Edit route
app.get("/blogs/:id/edit", (req, res){
    res.render("edit");
})



app.listen(port, process.env.IP, () => {
    console.log(`Server started on port ${port}`);
})