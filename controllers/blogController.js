const Blog = require('../models/blog');

const site_title = 'Node Blog';

const blog_index = (req, res) => {

    Blog.find().sort({ createdAt: -1 /* -1 means "descending" */ })
        .then((result) => {
            console.log(result);
            
            res.render('blogs/index', {
                site_title,
                page_title: 'Home',
                blogs: result
            });

        })
        .catch((error) => {
            console.log("FAILED TO FIND");
            console.log(error);
        });
}

const blog_new_form = (req, res) => {
    res.render('blogs/create', {
        site_title
    });
}

const blog_new_post = (req, res) => {

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
}

const blog_view_details = (req, res) => {
    Blog.findById( req.params.blog_id )
    .then((result) => {
        
        res.render('blogs/details', {
            site_title, 
            blog: result
        });

    })
    .catch((error) => console.log(error));
}

const blog_delete = (req, res) => {
    
    Blog.findByIdAndDelete( req.params.blog_id )
        .then((result) => {
            console.log('Deleted '+req.params.blog_id);
            
            //res.redirect('/'); <---- can't do this because this is an ajax call

            res.json({
                redirect: '/'
            });
        })
        .catch((error) => console.log(error));
}

module.exports = {
    blog_index,
    blog_new_form,
    blog_new_post,
    blog_view_details,
    blog_delete
};