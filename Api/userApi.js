// import express 
const exp=require('express')
const userApi=exp.Router();
const password=require('bcryptjs')
const CheckToken=require("./middleWare/Verify")
let jwt=require("jsonwebtoken")
const asyncHandler = require('express-async-handler')
// import  all cloudinary
const cloudinary=require('cloudinary').v2;
const multer=require("multer");
const {CloudinaryStorage}=require("multer-storage-cloudinary")
// configure cloudinary
cloudinary.config({
cloud_name:'deuxw5fnq',
api_key:'682947634262382',
api_secret:'etXQlbGKqAbspTUZ2TIv9a8tP8Y'
})
// configure the cloudinarystorage
const clStorage=new CloudinaryStorage({
  cloudinary:cloudinary,
  params:async(req,file)=>{
    return{
      folder:"CloudinaryOne",
      public_key:file.fieldname + '-'+ Date.now()
    }
  }

})
 // configure multer
 const multerObj=multer({storage:clStorage})
 
userApi.use(exp.json());
const { JsonWebTokenError } = require('jsonwebtoken');


// getuser
userApi.get("/getuser",asyncHandler(async(req,res,next)=>{
let userCollectionObj=req.app.get("userCollectionObj")
  // using aync and await
  let result=await userCollectionObj.find().toArray()
  res.send({message:result})

}))
// get user by using async,await
userApi.get("/getuser/:name",asyncHandler(async (req,res,next)=>{
  let userCollectionObj=req.app.get("userCollectionObj")
  let np=req.params.name;
    // geting username from database
 let user=await userCollectionObj.findOne({name:np})
if(user === null){
        res.send({message:"user is not existed"})
}
        else{
            res.send({message:user})
        }
}))

// createuser
//userApi.post('/createuser',(req,res,next)=>
//{
  //  let newUser=req.body;
    // save the information in database
    //userCollectionObj.insertOne(newUser,(err,success)=>{
       // if(err)
        //{
          //  console.log("err in creation",err);
        //}
       // else{
         //   res.send({message:"user created"})
        //}
    //})
//})
// create user
userApi.post("/createuser", multerObj.single('photo'),asyncHandler(async(req,res,next)=>{
  let userCollectionObj=req.app.get("userCollectionObj")
  // get user object
let newuser=JSON.parse(req.body.userobj);
// check the user is existed
 let user1=await userCollectionObj.findOne({name:newuser.name})
// the user is existed

    if(user1!==null)
    {
        res.send({message:"user is alredy existed"})
    }
    else{
        // hash the password
        let handlepassword=await password.hash(newuser.password,8)
        //console.log(handlepassword)
        // replace plain password with newpassword
        newuser.password=handlepassword;
        // add cdn link of image
        newuser.profileImage=req.file.path;
        // insert user
         await userCollectionObj.insertOne(newuser)
        res.send({message:"user created"})
            }
}))

/// user regisrtation
userApi.put("/updateuser/:name",asyncHandler( async(req,res,next)=>{
  let userCollectionObj=req.app.get("userCollectionObj")
  //let modifiedobj
  let modifiedobj=req.body;
   // to modified the data
  await userCollectionObj.updateOne({name:modifiedobj.name},{$set:{...modifiedobj}})
  res.send({message:"user is updated"})
   }))
   // delete user
   userApi.delete('/deleteuser/:name', asyncHandler(async(req,res,next)=>{
   // get url
    let result=req.params.name;
     // check user  is exited or not (or) find user
    let user= await userCollectionObj.findOne({name:result})
    // if user  not existed
     if(user===null)
     {
       res.send("user not  existed")
     }
     else{
       await userCollectionObj.deleteOne({name:result})
       res.send({message:"user is deleted"})
     }

   }))
// userlogin form
userApi.post('/login',asyncHandler(async(req,res,next)=>{
  let userCollectionObj=req.app.get("userCollectionObj")
  let client=req.body;
    // the compare user
    let server=await userCollectionObj.findOne({name:client.name})
    // if user existed
    if(server===null)
    {
        res.send({message:"invalid username"})
    }
    else
    {
        // password compare
       let result= await  password.compare(client.password,server.password);
    //console.log(result)
       // if token is not matched
       if(result===false)
       {
           res.send({message:"invalid password"})
       }
       else{
// create a token
let token=await jwt.sign({name:client.name},process.env.SECRET_KEY,{expiresIn:100})
 // remove password from user
//delete user.password;
res.send({message:"login-success",name:client.name,token:token})  
}

    }

}))
// to the cart
userApi.post('/addtocart',asyncHandler(async(req,res,next)=>{
  // get user cart collection
  let cartCollectionObj=req.app.get("cartCollectionObj")
  // get cart obj
  let userCartObj=req.body;
  let userInCart= await cartCollectionObj.findOne({name:userCartObj.name})
  if(userInCart===null)
  {
    let products=[];
products.push(userCartObj.cartObj)
let newUserObj={name:userCartObj.name,products:products}
 //console.log(newUserObj)
 await cartCollectionObj.insertOne(newUserObj)
 res.send({message:"product added"})
  }
  //else{
    userInCart.products.push(userCartObj.cartObj)
    // update 
    await cartCollectionObj.updateOne({name:userCartObj.name},{$set:{...userInCart}})
 res.send({message:"product added to cart"})
  //}

}))
userApi.get("/getproducts",asyncHandler(async(req,res,next)=>{
  let cartCollectionObj=req.app.get("cartCollectionObj")
  let result= await cartCollectionObj.find().toArray();
  res.send({message:result})
}))






// to protected
userApi.get('/testing',(req,res)=>{
  res.send({message:"this testing is protected"})
})

// export port
module.exports = userApi;