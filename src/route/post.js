const express = require('express');
const { createPost, getPosts, getPostsByUser, likePost, unlikePost } = require('../controller/post');
const { requiredLogin } = require('../middleware/requireLogin');
const router = express.Router();

router.post('/posts/createpost', requiredLogin, createPost)
router.get('/posts', requiredLogin, getPosts)
router.get('/getmyposts', requiredLogin, getPostsByUser)
router.put('/likepost', requiredLogin, likePost)
router.put('/unlikepost', requiredLogin, unlikePost)

module.exports = router
