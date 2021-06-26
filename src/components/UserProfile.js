import { useEffect,useState } from "react"
import axios from 'axios'
import { useParams } from "react-router";
import {BrowserRouter,Switch,Link,Route }from "react-router-dom";
import  AddCart  from './AddCart'
import ViewProduct from './ViewProduct'
export default function UserProfile(){
   let [user,setUser]=useState('');
  let [cart,setcart]=useState('')
   let paramsObj=useParams();
  const userCartButton=(cartObj)=>{
      // to get local storgage
      let name=localStorage.getItem('name');
      let newObj={name,cartObj}
//      console.log('new user is added',newObj)
      axios.post('/user/addtocart',newObj)
      .then(res=>{
let result=res.data;
alert(result.message)
      })
      .catch(err=>{
          console.log('error in adding product')
          alert("something went wrong")
      })
  }
  
  
  
  
   //get username from url
   useEffect(()=>{
  axios.get(`/user/getuser/${paramsObj.name}`)
   .then(res=>{
       let userObj=res.data.message;
       setUser({...userObj})
   })
   //let userObj=JSON.parse(localStorage,getItem('user'))
  // setUser({...userObj})
},[paramsObj.name])
   return(
        <div className="UserProfile">
        <h2 className="text-end">welcome,<span className="text-primary">{paramsObj.name}</span>
            <img src={user.profileImage} width="60px" alt=""/>
            </h2>
            <BrowserRouter>
<ul className="nav nav-piils">
    <li className="nav-item">
        <Link to="/AddCart" className="nav-link" >AddCart</Link>
    </li>
    <li className="nav-item">
        <Link to="/ViewProduct" className="nav-link" >ViewProduct</Link>
    </li>
</ul>
<Switch>
    <Route path="/AddCart">
        <AddCart/>
        </Route>
        <Route path="/ViewProduct">
        <ViewProduct userCartButton={userCartButton}/>
        </Route>

    </Switch>
    </BrowserRouter>
            </div>
        
    )
}