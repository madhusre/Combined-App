// import express module
const exp=require('express')
const app=exp();
const path=require('path')
require('dotenv').config()
// connect build of react withcurrent server
app.use(exp.static(path.join(__dirname,'./build/')))

// import 
const userApi=require('./Api/userApi')
const adminApi=require('./Api/adminApi')
const productApi=require('./Api/productApi')

const mongoClient=require("mongodb").MongoClient;

app.use('/user',userApi)
app.use('/admin',adminApi)
app.use('/product',productApi)
// db connection to  url
let dburl=process.env.DATABASE_URL;
//userApi.get('/getusers',(req,res)=>{
   /// res.send("new user id is created")
//})
// databse object
let userCollectionObj;
// connct to the mangodb server
mongoClient.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>
{
if(err)
{
   console.log("error in db connect",err)
}
else{
   let  databaseObj=client.db("onedatabase")
   // create  user collection objesct
 let userCollectionObj=databaseObj.collection("userCollection")
 let adminCollectionObj=databaseObj.collection("admincollection")
 let productCollectionObj=databaseObj.collection("productCollection")
 let cartCollectionObj=databaseObj.collection("userCartCollection")
// sharing collection object
app.set("userCollectionObj",userCollectionObj)
app.set("adminCollectionObj",adminCollectionObj)
app.set("productCollectionObj",productCollectionObj)
app.set("cartCollectionObj",cartCollectionObj)
console.log("DB connection is success")
}
})

app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
  //handle invalid path
  app.use((req,res,next)=>{
      res.send({message:`path ${req.url} is invalid`})
  })
  // handle errore in synchronously
  app.use((err,req,res,next)=>{
      console.log(err)
      res.send({message:err.message})
  })
// assign a port
const port=process.env.PORT_NO;
app.listen(port,()=>{
    console.log("hlo api")
})







