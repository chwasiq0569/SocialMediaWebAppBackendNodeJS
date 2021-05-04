const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express()
const authRoutes = require('./route/user');
const postRoutes = require('./route/post');
const { requiredLogin } = require('./middleware/requireLogin');
const Post = require('./model/post');

dotenv.config();

app.use(express.json())

mongoose.set('useCreateIndex', true);

mongoose.connect(`mongodb+srv://admin:admin@cluster0.2gnhl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => console.log("DB CONNECTED")).catch((err) => console.log("Error: ", err))

// app.post('/posts',requiredLogin, async (req, res) => {
//     const { title, body, photo } = req.body;
//     if(!title || !body){
//         return res.status(422).json({ error: 'Please fill the required fields' })
//     }
//     req.user.password = undefined;
//     const post = new Post({
//         title: req.body.title, 
//         body: req.body.body, 
//         postedBy: req.user
//     })
//     const createdPost = await post.save();
//     if(createdPost){
//          return res.status(201).json({ post: createdPost })
//     }else{
//         return res.status(422).json({ message: 'Post not Created' })
//     }
// })

app.use('/api', authRoutes);
app.use('/api', postRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log("SERVER RUNNING ON PORT: "+ process.env.PORT)
})