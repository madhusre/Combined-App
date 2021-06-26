import { useForm } from "react-hook-form"
import axios from "axios"
import { useHistory } from "react-router";
import { useState } from 'react'
export default function Register()
{ 
 let {register,handleSubmit,formState:{errors}}=useForm();
 const history=useHistory();
 const [file, setFile]=useState(null);
    const onFormSubmit=(userobj)=>{
   // create aFormdata obj
let formData=new FormData();
// add file to formdata object
formData.append('photo',file,file.name)
//add userobj to formdata object
formData.append('userobj',JSON.stringify(userobj))
      // post req
    //fetch("/user/createuser",{
  //      method:"POST",
//headers:{
  //  'Content-Type':'application/json',
//},
//body:JSON.stringify(userobj),
//}
  //  )
//.then(res=>{
  //  return res.json()
//})
//.then(
  //  data=>alert(data.message)
//)
 axios.post('/user/createuser',formData)
    .then(res=>{
let resObj=res.data;
alert(resObj.message)
// navigate to login component
history.push('/login')
    })
    .catch(err=>{
        console.log(err)
        alert("something went wrong")
    })
    }

    // to save afile
    const FormSubmit=(e)=>{
setFile(e.target.files[0])

  }
    return(
    <div className="Register">
        <form className="form" onSubmit={handleSubmit(onFormSubmit)}>
            <input type="text" placeholder="name" {...register('name',{required:true})}className="form-control"></input>
            {errors.name?.type==='required' && <p className="text-danger float-start">* Name is required</p>}
            <input type="password" palceholder="password"{...register('password',{required:true})} className="form-control"></input>
            {errors.password?.type==='required' && <p className="text-danger float-start">*password is required</p>}
            <input type="email" placeholder="email" {...register('email',{required:true})}className="form-control"></input>
            {errors.email?.type==='required' && <p className="text-danger float-start">*email is required</p>}
    <input type="dateofbirth" placeholder="dateofbirth" {...register('dateofbirth',{required:true})}className="form-control"></input> 
    {errors.dateofbirth?.type==='required' && <p className="text-danger float-start">*dob is required</p>}
       <input type="file" name="photo" className="form-control" onChange={(e)=>{FormSubmit(e)}}></input>
        <button>submit</button>
        </form>
    </div>
    )
}