require("dotenv").config();
const express = require("express"),
  path = require('path');
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Post = require("./models/post"),
  User = require("./models/user"),
  methodOverride = require("method-override"),
  ejsMate = require('ejs-mate');

mongoose.connect(
  process.env.DATABASEURL,
  { useNewUrlParser: true }
);

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", async (req, res, next) =>{
  res.send("Holaa");
})

app.get("/v1/:token", async (req, res, next) =>{
  console.log(req.params.token)
  user = await User.findOne({ token: req.params.token });
  if (!user) {
    return res.send("Error")
  }
  res.render('posts/new');
});

app.get("/v1/:token/post", async function(req, res){
  user = await User.findOne({ token: req.params.token });
  if (!user) {
    return res.send("Error")
  }
  post = req.post;
  res.render('post/edit', {post});
});


app.post("/v1/:token", async (req, res, next) => {

  const post = new Post(req.body.post);

  //#TODO await post generation

  await post.save();
  console.log(post);
  req.flash('success', 'Post generado exitosamente.')
  req.post = post;
  res.redirect(`/v1/:token/post`)
});

app.listen(process.env.PORT || 3000, function() {
  console.log("listening on http://localhost:3000");
});