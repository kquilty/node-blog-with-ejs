const express = require('express');
const morgan = require('morgan');//<--------- middleware for logging
const mongoose = require('mongoose');//<----- middleware for better DB interaction

// Models
const Blog = require('./models/blog');

const app = express();

app.set('view engine', 'ejs');// by default, looks in "./views"

// middleware & static files
app.use(express.static('public'));// Make "/public" accessable to the browser


const site_title = 'Node Blog';


// Connect to mongodb
const targetClusterName = 'Cluster0';
const targetDbName = 'node-blog';
const dbURI = 'mongodb+srv://kquilty_db_user:ArwSpZ4KLwqzekZK@cluster0.o5gyhoz.mongodb.net/' + targetDbName + '?retryWrites=true&w=majority&appName=' + targetClusterName + '';
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








// SANDBOX routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog();
    blog.title = 'my title';
    blog.snippet = 'a snippet here';
    blog.body = 'here is the body';

    blog.save()
    .then((result) => {
        console.log("Saved new record.")
        console.log(result);
        res.send(result);
    })
    .catch((error) => {
        console.log("FAILED TO SAVE");
        console.log(error);
    });

});
app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        console.log(result);
        res.send(result);
    })
    .catch((error) => {
        console.log("FAILED TO FIND");
        console.log(error);
    });
});
app.get('/one-blog', (req, res) => {
    Blog.findById('68dd4cee6348009fec37acee')
    .then((result) => {
        console.log(result);
        res.send(result);
    })
    .catch((error) => {
        console.log("FAILED TO FIND");
        console.log(error);
    });
});







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