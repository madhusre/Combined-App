const exp=require("express")
const productApi=exp.Router();
 const asyncHandler=require('express-async-handler')
productApi.use(exp.json())
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




//const multerObj=require("./middleWare/Verify")
productApi.get('/getproduct',asyncHandler(async(req,res,next)=>{
 let productCollectionObj=req.app.get("productCollectionObj")
    let product=await productCollectionObj.find().toArray()
res.send({message:product})
}))
// get product
productApi.get('/getproduct/:name',asyncHandler(async(req,res,next)=>{
    let productCollectionObj=req.app.get("productCollectionObj")
    let product1=req.params.name;
    let product2=await productCollectionObj.findOne({name:product1})
    if(product2===null)
    {
        res.send({message:"product is not existed"})
    }
    else
    {
        res.send({message:product2})
    }
}))
// create product
productApi.post('/createproduct',multerObj.single('photo'), asyncHandler(async(req,res,next)=>{
let productCollectionObj=req.app.get("productCollectionObj")
    // to get data to json
    let result=JSON.parse(req.body.productObj);
let result1=await productCollectionObj.findOne({model:result.model})
if(result1!==null)
{
    res.send("user is alredy exited")
}
else{
     // add cdn link of image
     result.profileImage=req.file.path;
     await productCollectionObj.insertOne(result)

    res.send({message:"New product added"})
}
}))
module.exports= productApi;
