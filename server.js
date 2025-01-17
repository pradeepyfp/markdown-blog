const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const methodOverride = require('method-override');
const aritcleRouter = require('./routes/articles');
const app = express();

mongoose.connect('mongodb://localhost/blog');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles});
})

app.use('/articles', aritcleRouter);

app.listen(5000);
