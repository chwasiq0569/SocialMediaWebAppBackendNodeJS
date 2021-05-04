const Post = require("../model/post")

module.exports.getPosts = async (req, res) => {
    const { title, body, photo } = req.body;
    if(!title || !body){
        return res.status(422).json({ error: 'Please fill the required fields' })
    }
    req.user.password = undefined;
    const post = new Post({
        title: req.body.title, 
        body: req.body.body, 
        postedBy: req.user
    })
    const createdPost = await post.save();
    if(createdPost){
         return res.status(201).json({ post: createdPost })
    }else{
        return res.status(422).json({ message: 'Post not Created' })
    }
}