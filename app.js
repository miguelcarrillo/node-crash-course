const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://user1:WN4Y6Tbwmc1bXg5m@cluster0.ma42u.mongodb.net/node-tut?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then((result) => app.listen(3000))
.catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('tiny'));


app.get('/', (req, res) => {
    res.redirect('/blogs')
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.use( '/blogs', blogRoutes);

// 404s
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});