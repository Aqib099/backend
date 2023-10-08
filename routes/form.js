const express=require('express');
const router=express.Router();
const formController=require('../controllers/form');

router.post('/insertData', formController.insertData)
router.get('/getData', formController.getData)

module.exports= router;