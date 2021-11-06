const express = require('express');
const morgan = require('morgan');

const app = express();

// register view engine
app.set('view engine', 'ejs');

//Listen for requests
app.listen(3000);

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. '},
        {title: 'Mario finds star', snippet: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. '},
        {title: 'How to defeat Bowser', snippet: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. '},
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create'});
});

// 404s
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});