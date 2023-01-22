const MySql=require('mysql');
const dbConn=MySql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'college'
});
dbConn.connect(function(error){
if (error)
  throw error;
  console.log("DataBase Connection Success");
});
module.exports=dbConn;
