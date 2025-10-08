const express = require('express');
const app = express();

app.set('view engine', 'ejs');//<------------------------ Use EJS as the view engine (by default, looks in "./views")
app.use(express.static('public'));//<-------------------- Make "/public" accessable to the browser
app.use(express.urlencoded({ extended: true}));//<------- Pass incoming urlencoded data into "req.body"



// LOGS ------------------------------------------------------------------------------------------
const morgan = require('morgan');//<--------- middleware for logging
app.use(morgan('dev'));//<------------------- Log request to console



// DATABASE --------------------------------------------------------------------------------------
// 1. Connect to DB (mongodb, using "mongoose")
// 2. Begin watching
const mongoose = require('mongoose');//<----- middleware for better DB interaction (Models, etc)
const targetDbClusterName = 'Cluster0';
const targetDbName = 'node-blog';
const targetDbUser = 'kquilty_db_user';
const targetDbPass = require('./private/db_password');
const dbURI = 'mongodb+srv://' + targetDbUser + ':' + targetDbPass + '@cluster0.o5gyhoz.mongodb.net/' + targetDbName + '?retryWrites=true&w=majority&appName=' + targetDbClusterName + '';
console.log("connecting to DB...");
mongoose.connect(dbURI)
    .then((result) => {
        console.log("Connected");
        console.log("Listening at: http://localhost:3000/");
        
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
const blogRoutes = require('./routes/blogRoutes');
app.use('/blogs', blogRoutes);

// Redirects
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