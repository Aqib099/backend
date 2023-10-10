const express=require('express');
const router=express.Router();
const usersignup=require('../controllers/login');

//creating Routes
router.post('/signup', usersignup.signup)
router.post('/signin', usersignup.LoginUser)
module.exports= router;
