const express = require('express');
const router = express.Router();

// Models
const Blog = require('../models/blog');

const site_title = 'Node Blog';


router.get('/', (req, res) => {

    Blog.find().sort({ createdAt: -1 /* -1 means "descending" */ })
        .then((result) => {
            console.log(result);
            
            res.render('index', {
                site_title,
                page_title: 'Home',
                blogs: result
            });

        })
        .catch((error) => {
            console.log("FAILED TO FIND");
            console.log(error);
        });
});

router.get('/create', (req, res) => {
    res.render('create', {
        site_title
    });
});

router.post('/', (req, res) => { // New blog posted

    console.log(req.body);

    const blog = new Blog( req.body );
    // blog.title = req.body.title;
    // blog.snippet = req.body.snippet;
    // blog.body = req.body.body;

    blog.save()
        .then(() => res.redirect('/'))
        .catch((error) => {
            console.log("FAILED TO FIND");
            console.log(error);
        });
});


router.get('/:blog_id', (req, res) => {
    Blog.findById( req.params.blog_id )
    .then((result) => {
        
        res.render('details', {
            site_title, 
            blog: result
        });

    })
    .catch((error) => console.log(error));
});


router.delete('/:blog_id', (req, res) => {
    
    Blog.findByIdAndDelete( req.params.blog_id )
        .then((result) => {
            console.log('Deleted '+req.params.blog_id);
            
            //res.redirect('/'); <---- can't do this because this is an ajax call

            res.json({
                redirect: '/'
            });
        })
        .catch((error) => console.log(error));
});

module.exports = router;