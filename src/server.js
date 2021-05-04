const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express()
const authRoutes = require('./route/user')

dotenv.config();

app.use(express.json())

mongoose.set('useCreateIndex', true);

mongoose.connect(`mongodb+srv://admin:admin@cluster0.2gnhl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => console.log("DB CONNECTED")).catch((err) => console.log("Error: ", err))

app.use('/api', authRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log("SERVER RUNNING ON PORT: "+ process.env.PORT)
})