const express = require('express');
const morgan = require('morgan');//<--------- middleware for logging
const mongoose = require('mongoose');//<----- middleware for better DB interaction

const app = express();

app.set('view engine', 'ejs');// by default, looks in "./views"

// middleware & static files
app.use(express.static('public'));// Make "/public" accessable to the browser


const site_title = 'Node Blog';

// Connect to mongodb
const dbURI = 'mongodb+srv://kquilty_db_user:ArwSpZ4KLwqzekZK@cluster0.o5gyhoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
console.log("connecting to DB...");
mongoose.connect(dbURI)
    .then((result) => {
        console.log("Connected");
        
        // Safe to begin listening
        app.listen(3000);
    })
    .catch((error) => {
        console.log("CONNECTION FAILED");
        console.log(error);
    });

/* Example: Custom log

    app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();//tell the browser not to hang and do nothing (crazy that this is needed)
    });

*/

// Log request to console
app.use(morgan('dev'));

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