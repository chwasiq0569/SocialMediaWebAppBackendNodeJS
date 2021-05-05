const express = require('express');
const { createPost, getPosts, getPostsByUser } = require('../controller/post');
const { requiredLogin } = require('../middleware/requireLogin');
const router = express.Router();

router.post('/posts/createpost', requiredLogin, createPost)
router.get('/posts', requiredLogin, getPosts)
router.get('/getmyposts', requiredLogin, getPostsByUser)

module.exports = router
