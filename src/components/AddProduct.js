import { useForm} from "react-hook-form"
import axios from 'axios'
import {useState} from 'react'
//import  {useHistory} from 'react-Router'
export default function AddProduct (){
const {register,handleSubmit}=useForm();
const [file ,setfile]=useState(null);
//const history=useHistory();
  const onFormSubmit=(productObj)=>{
     // to create aform object
     let formData=new FormData();
     //to  get file to formobject
     formData.append('photo',file,file.name)
     // to  productobj to formobject 
     formData.append('productObj',JSON.stringify(productObj))
       axios.post('/product/createproduct',formData)
       .then(res=>{
let resultObj=res.data;
alert( resultObj.message)
//if(resultObj=="New product added"){
// to store local
//localStorage.setItem("name",resultObj.name)
  // to push elements
 // history.push('/ViewProduct')
//}
})
       
.catch(err=>
    {
      console.log(err)
      alert('something went wrong')
    })
  //console.log(productObj)
}
const onFormStatus=(e)=>{
setfile(e.target.files[0])
}
return(
        <div className="Add Product">
            <form  className="form"onSubmit={handleSubmit(onFormSubmit)}>
                <input type="text"  placeholder="name"{...register("name")}  className="form-control"></input>
                <input type="model" placeholder="model" {...register("model")} className="form-control"></input>
                <input type="number"  placeholder="price" {...register("price")} className="form-control"></input>
                 <input type="number" placeholder="number"{...register("number")} className="form-control"></input>
                 <input type="file" name="photo" className="form-control" onChange={(e)=>{onFormStatus(e)}}></input>
           <button>submit</button>
            </form>
        </div>
    )
}