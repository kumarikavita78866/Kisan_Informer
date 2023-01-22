const express = require('express');
const router=express.Router();
const userController=require('../controller/user.controller');
router.get('/get',userController.getUser);
router.get('/get/:id',userController.getUserById);
router.post('/save',userController.saveUser);
router.get('/delete/:id',userController.deleteUserById);
//router.put('/update/:id',userController.updateUserById);
router.get('/loginuser/email/:E_MAIL/pass/:PASSWORD',userController.LoginUSER);
//router.post('/saveImage',userController.getImage);

module.exports=router;
