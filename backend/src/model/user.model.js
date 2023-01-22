const dbConn=require('../../config/db.config');
var USER=function(user){
this.id=user.ID
this.FULL_NAME=user.FULL_NAME
this.E_MAIL=user.E_MAIL
this.PHONE_NUMBER=user.PHONE_NUMBER
this.PASSWORD=user.PASSWORD
this.CONFIRM_PASSWORD=user.CONFIRM_PASSWORD
//this.PHOTO=user.PHOTO
};

USER.getuserlist=(result)=>{
  dbConn.query('select*from register',(err,res)=>{
    if (err){
      console.log('ERROR FOUND WHILE FETCHING DATA.',err);
      result(null,res);
    }
    else{
      console.log('USER DATA FETCHED SUCCESSFULLY.');
      result(null,res);
    }
  });
}
USER.getuserID=(id,result)=>{
  dbConn.query('select*from register where id=?',id,(err,res)=>{
    if (err){
      console.log('ERROR FOUND WHILE FETCHING DATA.',err);
      result(null,res);
    }
    else{
      console.log('USER DATA FETCHED SUCCESSFULLY.');
      result(null,res);
    }
  });
}
USER.insertuser=(userRequest,result)=>{
  dbConn.query('insert into register set ?',userRequest,(err,res)=>{
    if(err){
      console.log("ERROR FOUND FETCHING DATA.",err);
      result(null,res);
    }
    else{
      console.log("USER DATA HAS BEEN SUCCESSFULLY SAVED.",res);
      result(null,res);
    }
  })
}
USER.deleteuserID=(id,result)=>{
  dbConn.query('delete from register where id=?',id,(err,res)=>{
    if (err){
      console.log('ERROR FOUND WHILE DELETING DATA.',err);
      result(null,res);
    }
    else{
      console.log('USER DATA HAS BEEN SUCCESSFULLY DELETED.');
      result(null,res);
    }
  });
}
USER.updateuserID=(id,usr,result)=>{
  console.log('post data: ',usr);
  dbConn.query('update register set full_name=?,e_mail=?,phone_number=?,password=?,confirm_password=? where id=?',[usr.full_name,usr.e_mail,usr.phone_number,usr.password,usr.confirm_password,id],(err,res)=>{
    if (err){
      console.log('ERROR FOUND WHILE UPDATING DATA.',err);
      result(null,res);
    }
    else{
      console.log('USER DATA HAS BEEN  SUCCESSFULLY UPDATED.');
      result(null,res);
    }
  });
}
USER.LoginUserByEmailandPass=(email,pass,result)=>{
  dbConn.query('Select * from register where E_MAIL=? and PASSWORD=?',[email,pass],(err,res)=>{
    if(err){
      console.log(err);
      result(null,res);
    }else{
      console.log(res);
      result(null,res);
    }
  })
}
module.exports=USER;