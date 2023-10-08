const express=require("express");
const router=express.Router();
const userController = require("../controllers/user");

//posting data
router.post('/createuser', userController.createdata)
router.get('/getAllData', userController.getAllData)
router.put('/updateData', userController.updateById)
module.exports= router;
