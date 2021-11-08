const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', { title: 'Blog', blogs: result });
    })
    .catch((err) => {
        console.log(err);
    });
    
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/blogs')
    })
    .catch((err) => {
        console.log(err);
    });
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Blog.findById(id)
    .then((result) => {
        res.render('details', { blog: result, title: 'Blog Detail'})
    })
    .catch((err) => {
        console.log(err);
    });

})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Blog.findByIdAndDelete(id)
    .then(result => {
       res.json({ redirect: '/blogs'})
    })
    .catch((err) => {
        console.log(err);
    });

})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create'});
});

// 404s
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});