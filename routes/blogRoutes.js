const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// GET
router.get('/',             blogController.blog_index);
router.get('/create',       blogController.blog_new_form);
router.get('/:blog_id',     blogController.blog_view_details);

// POST
router.post('/',            blogController.blog_new_post); // New blog posted

// DELETE
router.delete('/:blog_id',  blogController.blog_delete);

module.exports = router;