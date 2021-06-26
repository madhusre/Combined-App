const exp=require("express")
const adminApi=exp.Router();
let jwt=require("jsonwebtoken")
adminApi.use(exp.json());
const asyncHandler = require('express-async-handler')

adminApi.post('/login',asyncHandler(async(req,res,next)=>{
    let adminCollectionObj=req.app.get("adminCollectionObj")
    let client=req.body;
      // the compare user
      let server=await adminCollectionObj.findOne({name:client.name})
      // if user existed
      if(server===null)
      {
          res.send({message:"invalid username"})
      }
      else
      {
          // password compare
       //  let result= await  password.compare(client.password,server.password);
      //console.log(result)
         // if token is not matched
         if(client.password!==server.password)
         {
             res.send({message:"invalid password"})
         }
         else{
  // create a token
  let token=await jwt.sign({name:client.name},"abcdef",{expiresIn:100})
   // remove password from user
  //delete user.password;
  res.send({message:"login-success",name:client.name,token:token})  
  }
  
      }
  
  }))



module.exports= adminApi;
