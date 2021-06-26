import {useForm} from "react-hook-form"
import axios from'axios'
import { useHistory } from "react-router";
export default function Login()
{
    const{register,handleSubmit}=useForm();
    const history=useHistory();
    const onFormSubmit=(userObj)=>{
///console.log(userObj)
        // make apost request
 axios.post(`/${userObj.type}/Login`,userObj)
.then(res=>{
    let resObj=res.data;
    if(resObj.message==='login-success'){
    //save token in local storage
localStorage.setItem("token",resObj.token)
    localStorage.setItem("name",resObj.name)
    //localStorage.setItem("user",JSON.stringify(resObj.userObj))
//props.setUserLogin(true)
   if(userObj.type==="user")
   {
//nav to userprofile
  history.push(`/UserProfile/${resObj.name}`)
}
if(userObj.type==="admin")
   {
//nav to Adminprofile
  history.push(`/AdminProfile/${resObj.name}`)
}

 }
 else{
alert(resObj.message)
  }

})
    
.catch(err=>{
    console.log(err)
    alert("something went wrong in login")
})
}
    return(
    <div className="Login">
        <form  onSubmit={handleSubmit(onFormSubmit)}>
            <input type="radio" id="admin" className="form-check-input" {...register("type")} value="admin" ></input>
            <label for="admin" className="form-check-label">admin</label>
            <input type="radio" id="user" className="form-check-input"{...register("type")}  value="user"></input>
            <label for="user" className="form-check-label">user</label>
            <input type="text" placeholder="name"{...register("name")} className="form-control"></input>
            <input type="password" placeholder="password" {...register("password")}className="form-control"></input>
       <button>submit</button>
        </form>
    </div>
    )
}