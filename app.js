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


app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log("ERROR!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});







app.listen(port, process.env.IP, () => {
    console.log(`Server started on port ${port}`);
})