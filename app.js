const express = require('express');

const app = express();

app.set('view engine', 'ejs');// by default, looks in "./views"

app.use(express.static('public'));

app.listen(3000);


const site_title = 'Node Blog';



// Routes
app.get('/', (req, res) => {
    // "send" no longer needs content-type or status
    // res.sendFile('./views/index.html', {root: __dirname});


    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];

    res.render('index', {
        site_title,
        page_title: 'Home',
        blogs
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        site_title
    });
});
app.get('/blogs/create', (req, res) => {
    res.render('create', {
        site_title
    });
});


// Redirect some old pages
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


// If WE GOT TO THIS POINT, use this 404 page
app.use((req, res) => {
    res.status(404).render('404', {
        site_title,
        attempted_url: req.url
    });
});