const model=require('../model/user.model');
// const fs = require('fs');
// const mime = require('mime');
// const uid = require('uuid');


exports.getUser=(req,res)=>{
  model.getuserlist((err,usr)=>
  {
    if (err) {
      res.json({Message : "FALSE"})
      console.log("404 :ERROR FOUND");

    }
    else{
      console.log('USER LIST',usr);
      res.json({Message:'Success',UserList:usr})
    }
  });
};
exports.getUserById=(req,res)=>{
  model.getuserID(req.params.id,(err,usr)=>
  {
    if (err) {
        res.send(err);
      console.log("404 :ERROR FOUND");

    }
    else{
      console.log('USER LIST',usr);
      res.send(usr);
    }
  });
}
exports.saveUser=(req,res)=>{

    console.log(req.body);
    const userRequest=new model(req.body);
    model.insertuser(userRequest,(err,usr)=>{

      if (err) {
          res.send(err);
        console.log("DATA NOT INSERT",err);

      }
      else{
        console.log("DATA SAVED");
        res.json({Message:'SUCCESS', User:usr});
      }
    })
}
exports.deleteUserById=(req,res)=>{
  model.deleteuserID(req.params.id,(err,usr)=>
  {
    if (err) {
        res.send(err);
      console.log("404 :ERROUR FOUND",err);

    }
    else{
      console.log('USER DELETED LIST',usr);
      res.json({Message:'Success', Response:usr});
    }
  });
}
exports.updateUserListById=(req,res)=>{
console.log(req.body);
  var userReq= new model(req.body);
  model.updateuserID(req.params.id,userReq,(err,usr)=>
  {
    if (err) {
        res.send(err);
      console.log("404 :ERROR FOUND",err);
    }
    else{
      console.log('USER UPDATED LIST',usr);
      res.send(usr);
    }
  });
}
exports.LoginUSER=(req,res)=>{
  model.LoginUserByEmailandPass(req.params.E_MAIL,req.params.PASSWORD,(err,Loginres)=>{
    if(err){
      console.log("err");
    }else{
      console.log(Loginres);
      res.json({Message:"Success",LoginResponse:Loginres});
    }
  })
}

// exports.getImage=(req,res)=>{
//   // to declare some path to store your converted image
// var decodedImg = decodeBase64Image(req.body.img);
// var imageBuffer = decodedImg.data;//exact bas64
// var type = decodedImg.type;//image extansion
// var extension = mime.getExtension(type);
// var fileName =  uid.v1()+"." + extension;
// try{
//       fs.writeFileSync("photo/" + fileName, imageBuffer, 'utf8');
//       res.json({Message :'Success',path:"photo/"+fileName});
//    }
// catch(err){
//    console.error(err)
//    res.json({Message :err});
// }
// };


// function decodeBase64Image(dataString) {
// var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
//   response = {};

// if (matches.length !== 3) {
//   return new Error('Invalid input string');
// }

// response.type = matches[1];
// response.data = new Buffer(matches[2], 'base64');

// return response;
// }

