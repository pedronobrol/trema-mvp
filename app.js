require("dotenv").config();
const generateCaption = require('./utils/transformer/index');
const express = require("express"),
  path = require('path');
const { connection } = require("mongoose");
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
app.use(express.json());

app.get("/", async (req, res, next) =>{
  res.send("Holaa");
})

app.get("/v1/:token", async (req, res, next) =>{
  console.log(req.params.token)
  user = await User.findOne({ token: req.params.token });
  console.log(user)
  if (!user) {
    return res.send("Error")
  }
  res.render('posts/new');
});

app.post("/v1/:token", async (req, res, next) => {

  const languageMapper = {
    'Español': 'Spanish',
    'Inglés': 'English',
    'Portugués': 'Portuguese',
  }

  const categoryMapper = {
    'Restaurante': 'restaurant',
    'Moda': 'fashion', 
    'Tecnología': 'tech',
    'Salud': 'health'
  }


  keywordsParse = JSON.parse(req.body.keywords);
  keywords = []
  for (e in keywordsParse){
    keywords.push(keywordsParse[e].value)
  }
  var post = {language: languageMapper[req.body.language],
              companyName: req.body.name,
              keywords: keywords,
              location: req.body.location,
              category: categoryMapper[req.body.category],
              audience: req.body.audience,
              emoji: req.body.emoji,
              funny: req.body.funny,
              question: req.body.question,
              emoji:req.body.emoji,
              hashtag: req.body.hashtag
            }
  try{
  message = await generateCaption(post)
  message = message.data.choices[0].text
  console.log(message)
  // const post = new Post(req.body.post);

  // //#TODO await post generation

  // await post.save();
  // console.log(post);
  // req.flash('success', 'Post generado exitosamente.')
  // req.post = post;
  //res.redirect(`/v1/${req.body.params.token}`)
  res.send(message)

  } catch(e){
    return "Error"
  }
});

app.get("/v1/:token/post", async function(req, res){
  user = await User.findOne({ token: req.params.token });
  if (!user) {
    return res.send("Error")
  }
  post = req.post;
  res.render('post/edit', {post});
});




app.listen(process.env.PORT || 3000, function() {
  console.log("listening on http://localhost:3000");
});