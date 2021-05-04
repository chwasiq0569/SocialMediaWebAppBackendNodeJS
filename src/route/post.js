const express = require('express');
const { getPosts } = require('../controller/post');
const { requiredLogin } = require('../middleware/requireLogin');
const router = express.Router();

router.post('/posts', requiredLogin, getPosts)

module.exports = router
