const express=require('express');
const router=express.Router();
const usersignup=require('../controllers/login');

//creating Routes
router.post('/signup', usersignup.signup)
router.post('/signin', usersignup.LoginUser)
router.post('/passwordforgot', usersignup.userPasswordReset)
router.put('/passwordreset/:token', usersignup.saveResetPassword)
module.exports= router;

