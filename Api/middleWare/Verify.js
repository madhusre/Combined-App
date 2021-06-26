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
0