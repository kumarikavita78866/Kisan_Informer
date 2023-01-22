const Express=require('express');
const bodyParser=require('body-parser');
const app=Express();
const port=process.env.port || 5200;

app.use(bodyParser.urlencoded({limit:'30mb',parameterLimit:100000, extended:true}));
app.use(bodyParser.json({limit:'30mb'}));

const userRoutes=require('./src/routes/user.routes');
app.use('/api/user',userRoutes);


app.listen(port,()=>{
console.log("SERVER FOUND AT PORT :",{port});
});