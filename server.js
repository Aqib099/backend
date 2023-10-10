const express = require('express');
const dotenv = require('dotenv');
const bodypaser=require('body-parser');
const userRoutes =require('./routes/user');
const formRoutes =require('./routes/form');
const loginuser = require('./routes/loginroutes');
const app = express();
const mongoose =require('./config/connection')
dotenv.config();

app.use(bodypaser.json())
app.use(express.static('Public'))

let port = process.env.PORT || 8080;

app.use('/user', userRoutes)
app.use('/form', formRoutes)
app.use('/signupUser', loginuser)
app.listen(port, (req, res) => {
    console.log(`Server is listening on Localhost ${port}`)
});

