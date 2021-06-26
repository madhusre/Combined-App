import Home from'./components/Home'
import Login from'./components/Login'
import Register from './components/Register'
import UserProfile from './components/UserProfile'
import Test from'./components/Test'
import AdminProfile from './components/AdminProfile'
import {BrowserRouter,Switch,Route,Link}from "react-router-dom"
//import { useState } from "react"

import './App.css';
function App() {
 
  //const LogoutUser=()=>{
    //localStorage.clear();
    //setUserLogin(false)
 // }
  return (
    <div className="App">
      <BrowserRouter>
<ul className="nav bg-info">
  <li className="nav-item">
   <Link to="/Home" className="nav-link">Home</Link>
  </li>
  
    
  <li className="nav-item">
  <Link to="/Login" className="nav-link">Login</Link>
  </li>

  <li className="nav-item">
  <Link to="/Register" className="nav-link">Register</Link>
  </li>
  <li className="nav-item">
  <Link to="/Test" className="nav-link">Test</Link>
  </li>
  
</ul>
<Switch>
  <Route path="/Home">
    <Home/>
  </Route>
  <Route path="/Login">
    <Login></Login>
  </Route>
  <Route path="/UserProfile/:name">
    <UserProfile/>
  </Route>
  <Route path="/AdminProfile/:name">
    <AdminProfile/>
  </Route>
  <Route path="/Register">
    <Register/>
  </Route>
  <Route path="/Test">
    <Test/>
  </Route>
  </Switch>
</BrowserRouter>
     
    </div>
  );
}

export default App;
