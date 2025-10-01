const express = require('express');
const morgan = require('morgan');//<--------- middleware for logging
const mongoose = require('mongoose');//<----- middleware for better DB interaction
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Use EJS as the view engine
app.set('view engine', 'ejs');// by default, looks in "./views"

// middleware & static files
app.use(express.static('public'));//<-------------------- Make "/public" accessable to the browser
app.use(morgan('dev'));//<------------------------------- Log request to console
app.use(express.urlencoded({ extended: true}));//<------- Pass incoming urlencoded data into "req.body"


// 1. Connect to DB (mongodb, using "mongoose")
// 2. Begin watching
const targetDbClusterName = 'Cluster0';
const targetDbName = 'node-blog';
const targetDbUser = 'kquilty_db_user';
const targetDbPass = 'ArwSpZ4KLwqzekZK';
const dbURI = 'mongodb+srv://' + targetDbUser + ':' + targetDbPass + '@cluster0.o5gyhoz.mongodb.net/' + targetDbName + '?retryWrites=true&w=majority&appName=' + targetDbClusterName + '';
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


// ROUTES --------------------------------------------------------------------------------------
// Top Level Routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/about', (req, res) => {
    res.render('about');
});

// Blog routes
app.use('/blogs', blogRoutes);

// RedirectS
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


// 404 FALLBACK ---------------------------------------------------------------------------------
// If the code has reached here, use this 404 page
app.use((req, res) => {
    res.status(404).render('404', {
        attempted_url: req.url
    });
});