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
    useUnifiedTopology : true,
    useFindAndModify: false
}).then(() => console.log("DB CONNECTED")).catch((err) => console.log("Error: ", err))


app.use('/api', authRoutes);
app.use('/api', postRoutes);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("SERVER RUNNING ON PORT: "+ PORT)
})