import {BrowserRouter,Switch,Link,Route }from "react-router-dom"
import AddProduct from './AddProduct'
import ViewProduct from './ViewProduct'
export default function AdminProfile()
{
    return(
        <div className="AdminProfile">
<BrowserRouter>
<ul className="nav nav-piils">
    <li className="nav-item">
        <Link to="/AddProduct" className="nav-link" >AddProduct</Link>
    </li>
    <li className="nav-item">
        <Link to="/ViewProduct" className="nav-link" >ViewProduct</Link>
    </li>
</ul>
<Switch>
    <Route path="/AddProduct">
        <AddProduct/>
        </Route>
        <Route path="/ViewProduct">
        <ViewProduct/>
        </Route>

    </Switch></BrowserRouter>
        </div>
    )
}